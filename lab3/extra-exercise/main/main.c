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

volatile uint8_t cpu0_ulIdleCycleCount = 0UL;
volatile uint8_t cpu1_ulIdleCycleCount = 0UL;


void idle_cpu0(void){
  cpu0_ulIdleCycleCount++;
  printf("cpu0:%d\n",cpu0_ulIdleCycleCount);
}

void idle_cpu1(void){
  cpu1_ulIdleCycleCount++;
  printf("cpu1:%d\n",cpu1_ulIdleCycleCount);
}

void app_main(void)
{
  esp_register_freertos_idle_hook_for_cpu(idle_cpu0,0);
  esp_register_freertos_idle_hook_for_cpu(idle_cpu1,1);
} 


