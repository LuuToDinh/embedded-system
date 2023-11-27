#include <stdio.h>
#include <time.h>
#include "sdkconfig.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "spi_flash_mmap.h"
#include <freertos/queue.h>

#define QUEUE_SIZE 10
#define TOTAL_TASK 3
#define TASK1_ID 0
#define TASK2_ID 1
#define TASK3_ID 2
#define DUMB_ID 9

//  BaseType_t xQueueSendToFront ( QueueHandle_t xQueue ,const void * pvItemToQueue , TickType_t xTicksToWait );
//  BaseType_t xQueueSendToBack ( QueueHandle_t xQueue ,const void * pvItemToQueue , TickType_t xTicksToWait );
//  BaseType_t xQueueReceive ( QueueHandle_t xQueue , void * const pvBuffer , TickType_t xTicksToWait );
//  UBaseType_t uxQueueMessagesWaiting ( QueueHandle_t xQueue );

struct Request{
  int taskID;
  char data[10];
};

QueueHandle_t xQueue;
bool isRead[TOTAL_TASK];
int genTaskID(){
  int tmp = rand() % 10;
  if (tmp > 8) return DUMB_ID;
  else return rand() % TOTAL_TASK;
}

bool isAllRead(){
  bool result = true;
  for (int i = 0; i < TOTAL_TASK; ++i)
  result = result && isRead[i];
  return result;
}

void printQueueInfo(QueueHandle_t xQueue){
  printf("-----------------\n");
  printf("QUEUE INFO\n");
  printf("Number of Request in queue   : %d\n", uxQueueMessagesWaiting(xQueue));
  printf("Number of free item in queue: %d\n", uxQueueSpacesAvailable(xQueue));
  printf("-----------------\n");
}



void receptionTask(void *pvParameter){
  struct Request xRequest;
  while (1){
      xRequest.taskID = genTaskID();
      if (xQueueSendToBack(xQueue, &xRequest, (TickType_t)10) != pdPASS){
          printf("ReceptionTask: Send failed!!!\n");
      }
      else {
          printf("ReceptionTask: Send TaskID: %d\n", xRequest.taskID + 1);
      }
      printQueueInfo(xQueue);
      vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}



void functionalTask(void *pvParameter){
  struct Request xRequest;
  while (1){
    // Check Receive from queue but don't delete item in queue '
    if (xQueuePeek(xQueue, &xRequest, (TickType_t)10) != pdPASS){
        printf("FunctionalTask1: Receive failed!!!\n");
    }
    else {
        // printf("Receive ID: %d\n", xRequest.taskID);
        if (xRequest.taskID == TASK1_ID){
          xQueueReceive(xQueue, &xRequest, (TickType_t)10);
          isAllRead();
          // HANDLE
          printf("FunctionalTask1: Handle task1\n");
        }
        else isRead[TASK1_ID] = true;
    }
    vTaskDelay(2000 / portTICK_PERIOD_MS);
  }
}


void errorHandlerTask(void *pvParameter){
  struct Request xRequest;
  while (1){
    if (xQueuePeek(xQueue, &xRequest, (TickType_t)10) != pdPASS){
        printf("ErrorHandlerTask: Receive failed!!!\n");
  }
    else {
        // printf("Receive ID: %d\n",xRequest.taskID);
        if (isAllRead()){
          xQueueReceive(xQueue, &xRequest, (TickType_t)10);
          // HANDLE
          printf("ErrorHandlerTask: Handle\n");
      }
    }
  vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}


void app_main(void){
  xQueue = xQueueCreate(QUEUE_SIZE, sizeof(struct Request *));
  isAllRead();
  xTaskCreate(&receptionTask, "ReceptionTask", 2048, NULL, 1, NULL);
  xTaskCreate(&functionalTask, "FunctionalTask1", 2048, NULL, 1, NULL);
  xTaskCreate(&functionalTask, "FunctionalTask2", 2048, NULL, 1, NULL);
  xTaskCreate(&functionalTask, "FunctionalTask3", 2048, NULL, 1, NULL);
  xTaskCreate(&errorHandlerTask, "ErrorHandlerTask", 2048, NULL, 1, NULL);
}


