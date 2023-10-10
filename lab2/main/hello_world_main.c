/* Hello World Example

   This example code is in the Public Domain (or CC0 licensed, at your option.)

   Unless required by applicable law or agreed to in writing, this
   software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied.
*/
#include <stdio.h>
#include "sdkconfig.h"

// Libraries needed for the use of FreeRTOS.
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
// #include "esp_spi_flash.h"
#include "spi_flash_mmap.h"

// Library needed for GPIO functions.
#include "driver/gpio.h"
#include "rom/gpio.h"

// Macro defining the GPIO for our input button.
#define BUTTON_GPIO 18

// Constant parameter representing active low logic level.
const int active_low = 0;

// This function prints out my student ID every 1 second.
void printStudentID(void* parameter)
{
    while (1)
    {
        printf("2013725\n");

        // Wait for 1s.
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }

    // Delete the task. This will never be reached.
    vTaskDelete(NULL);
}

// This function prints "ESP32" whenever the button connected
// to pin 18 is pressed.
void printESP32(void* parameter)
{
    // Select pin 18 as a GPIO pin.
    gpio_pad_select_gpio(BUTTON_GPIO);

    // Specify that the pin is an input pin.
    gpio_set_direction(BUTTON_GPIO, GPIO_MODE_INPUT);
    // Specify the pull mode as pullup.
    gpio_set_pull_mode(BUTTON_GPIO, GPIO_PULLUP_ONLY);

    while (1)
    {
        // When the button is pressed, print out "ESP32".
        if (gpio_get_level(BUTTON_GPIO) == active_low)
        {
            printf("ESP32\n");
        }
        // Debounce for 200ms.
        vTaskDelay(200 / portTICK_PERIOD_MS);
    }
    
    // Delete the task. This will never be reached.
    vTaskDelete(NULL);
}

void app_main(void)
{
    // Create the two tasks. printESP32 has a higher priority.
    xTaskCreate(printStudentID, "printStudentID", 1000, NULL, 1, NULL);
    xTaskCreate(printESP32, "printESP32", 1000, NULL, 2, NULL);
}
