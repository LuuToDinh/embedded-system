#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_freertos_hooks.h"
#include "sdkconfig.h"
#include "esp_log.h"
#include "esp_timer.h"
#include "esp_system.h"
#include "driver/gpio.h"
#include "FreeRTOSConfig.h"


volatile uint32_t ulIdleCycleCount = 0UL;
volatile uint32_t task1CycleCount = 0UL;
volatile uint32_t task2CycleCount = 0UL;
volatile uint32_t task3CycleCount = 0UL;


void vApplicationIdleHook(void) {
    ulIdleCycleCount++;
}


void printCounter(){
    printf("============================\n");
    printf("Task1 is Counting: %ld/1000000\n",task1CycleCount);
    printf("Task2 is Counting: %ld/2000000\n",task2CycleCount);
    printf("Task3 is Counting: %ld/3000000\n",task3CycleCount);
    printf("Idle count: %ld\n", ulIdleCycleCount);
    printf("============================\n");
}

void Task1(void){
    printf("----------------------------------\n");
    printf("Task 1 will be start!\n");
    printf("Task's counter before start\n");
    printCounter();
    printf("----------------------------------\n");
    int64_t begin_time = esp_timer_get_time();
    while (1)
    {
        task1CycleCount++;
        if(task1CycleCount >= 1000000){
            int64_t end_time = esp_timer_get_time();
            printf("----------------------------------\n");
            printf("Task 1 terminate during: %lld ms\n", (end_time-begin_time)/1000);
            printf("----------------------------------\n");
            printf("Task 1 ended!\n");
            printf("Result:\n");
            printCounter();
            printf("----------------------------------\n");
            vTaskDelete(NULL);
        } else {
            // printf("Task1 is Counting: %d\n",task1CycleCount);
        }
        
    }
}

void Task2(void){
    printf("----------------------------------\n");
    printf("Task 2 will be start!\n");
    printf("Task's counter before start\n");
    printCounter();
    printf("----------------------------------\n");
    int64_t begin_time = esp_timer_get_time();
    while (1)
    {
        task2CycleCount++;
        if(task2CycleCount >= 2000000){
            int64_t end_time = esp_timer_get_time();
            printf("----------------------------------\n");
            printf("Task 2 terminate during: %lld ms\n", (end_time-begin_time)/1000);
            printf("----------------------------------\n");
            printf("Task 2 ended!\n");
            printf("Result:\n");
            printCounter();
            printf("----------------------------------\n");
            vTaskDelete(NULL);
        } else {
            // printf("Task2 is Counting: %d\n",task2CycleCount);
        }
        
    }
}

void Task3(void){
    printf("----------------------------------\n");
    printf("Task 3 will be start!\n");
    printf("Task's counter before start\n");
    printCounter();
    printf("----------------------------------\n");
    int64_t begin_time = esp_timer_get_time();
    while (1)
    {
        task3CycleCount++;
        if(task3CycleCount >= 3000000){
            int64_t end_time = esp_timer_get_time();
            printf("----------------------------------\n");
            printf("Task 3 terminate during: %lld ms\n", (end_time-begin_time)/1000);
            printf("----------------------------------\n");
            printf("Task 3 ended!\n");
            printf("Result:\n");
            printCounter();
            printf("----------------------------------\n");
            vTaskDelete(NULL);
        } else {
            // printf("Task3 is Counting: %d\n",task3CycleCount);
        }
        
    }
       
    
}
void app_main() {
    esp_register_freertos_idle_hook_for_cpu(vApplicationIdleHook, 0);
    vTaskDelay(100 / portTICK_PERIOD_MS);
    xTaskCreatePinnedToCore(Task1, "Task1", 5120, NULL, 1, NULL, 0);
    xTaskCreatePinnedToCore(Task2, "Task2", 5120, NULL, 1, NULL, 0);

    /*Task 3 with higher prioriize level and go later (100ms)*/
    vTaskDelay(100 / portTICK_PERIOD_MS); 
    xTaskCreatePinnedToCore(Task3, "Task3", 5120, NULL, 5 , NULL, 0); 

    /*Task 3 with same prioriize level*/
    xTaskCreatePinnedToCore(Task3, "Task3", 5120, NULL, 1 , NULL, 0); 
    
}
