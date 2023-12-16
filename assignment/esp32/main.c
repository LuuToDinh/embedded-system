#include <stdio.h>
#include <time.h>
#include "sdkconfig.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "freertos/event_groups.h"
#include "mqtt_client.h"
#include "DHT22.h"
#include "esp_log.h"

// Định nghĩa cấu trúc cho dữ liệu cảm biến
typedef struct {
    float temperature;      // Dữ liệu nhiệt độ
    float humidity;         // Dữ liệu độ ẩm
    time_t timestamp;       // Thời điểm ghi nhận dữ liệu
} SensorData;

// Thông tin kết nối MQTT
#define BROKER_URI "mqtt://io.adafruit.com"              //  MQTT broker address của Adafruit
#define MQTT_USERNAME "ThinhNguyen1801"                  // Cấu hình tên đăng nhập Adafruit IO
#define MQTT_AIO_KEY "aio_TSiA240IuycfCKBobu5EyH6RDhMl"  // config Adafruit key
#define MQTT_TOPIC_TEMP "Temperature"                    // config MQTT cho nhiệt độ
#define MQTT_TOPIC_HUMID "Humidity"                      // config MQTT cho độ ẩm

static const char *TAG = "MQTT";

// Biến để lưu trữ kết nối MQTT
static esp_mqtt_client_handle_t mqtt_client;

// Hàm callback xử lý sự kiện MQTT
static esp_err_t mqtt_event_handler(esp_mqtt_event_handle_t event) {
    switch (event->event_id) {
        case MQTT_EVENT_CONNECTED:
            ESP_LOGI(TAG, "MQTT connected");
            break;
        case MQTT_EVENT_DISCONNECTED:
            ESP_LOGI(TAG, "MQTT disconnected");
            break;
        default:
            break;
    }
    return ESP_OK;
}

// Hàm để gửi dữ liệu cảm biến đến Adafruit qua MQTT
void sendSensorDataToAdafruit(SensorData *data, const char *mqtt_topic) {
    char payload[100];  // Đảm bảo đủ kích thước cho dữ liệu cần gửi

    // Định dạng dữ liệu thành chuỗi giống JSON hoặc định dạng mong muốn
    snprintf(payload, sizeof(payload), "{\"value\":%.2f,\"timestamp\":%ld}",
             data->temperature, (long)data->timestamp);

    // Kiểm tra xem mqtt_client có khác NULL trước khi xuất bản
    if (mqtt_client != NULL) {
        // Xuất bản dữ liệu lên chủ đề MQTT
        esp_mqtt_client_publish(mqtt_client, mqtt_topic, payload, 0, 1, 0);
    } else {
        ESP_LOGE(TAG, "MQTT client là NULL");
    }
}

// Task quan sát để thu thập dữ liệu và gửi nó qua MQTT
void observationTask(void *pvParameters) {
    SensorData sensorData;

    while (1) {
        // Thu thập dữ liệu cảm biến cho nhiệt độ
        collectSensorData(&sensorData);
        
        // Gửi dữ liệu nhiệt độ đến Adafruit qua MQTT
        sendSensorDataToAdafruit(&sensorData, MQTT_TOPIC_TEMP);

        // Thu thập dữ liệu cảm biến cho độ ẩm
        collectSensorData(&sensorData);
        // Gửi dữ liệu độ ẩm đến Adafruit qua MQTT
        sendSensorDataToAdafruit(&sensorData, MQTT_TOPIC_HUMID);

        // Delay một khoảng thời gian trước khi quan sát tiếp theo
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}

void app_main() {
    esp_log_level_set("*", ESP_LOG_INFO);

    // Khởi tạo tài khoản MQTT
    esp_mqtt_client_config_t mqtt_cfg = {
        .uri = BROKER_URI,
        .username = MQTT_USERNAME,
        .password = MQTT_AIO_KEY,
        .event_handle = mqtt_event_handler,
    };

    // Kết nối MQTT
    mqtt_client = esp_mqtt_client_init(&mqtt_cfg);
    esp_mqtt_client_start(mqtt_client);

    // Khởi tạo cảm biến DHT
    setDHTgpio(4);  // Đặt chân GPIO cho DHT22
    // Tạo và khởi động task quan sát
    xTaskCreate(observationTask, "observation_task", configMINIMAL_STACK_SIZE * 3, NULL, 5, NULL);

    // Khởi động lập trình chính của FreeRTOS
    vTaskStartScheduler();
}
