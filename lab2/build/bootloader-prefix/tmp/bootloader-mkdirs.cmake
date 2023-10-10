# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "C:/Users/dinhluu/esp/esp-idf/components/bootloader/subproject"
  "E:/BK_Subjects/Nam_4_ki_1/embedded-system/lab/test/hello_world/build/bootloader"
  "E:/BK_Subjects/Nam_4_ki_1/embedded-system/lab/test/hello_world/build/bootloader-prefix"
  "E:/BK_Subjects/Nam_4_ki_1/embedded-system/lab/test/hello_world/build/bootloader-prefix/tmp"
  "E:/BK_Subjects/Nam_4_ki_1/embedded-system/lab/test/hello_world/build/bootloader-prefix/src/bootloader-stamp"
  "E:/BK_Subjects/Nam_4_ki_1/embedded-system/lab/test/hello_world/build/bootloader-prefix/src"
  "E:/BK_Subjects/Nam_4_ki_1/embedded-system/lab/test/hello_world/build/bootloader-prefix/src/bootloader-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "E:/BK_Subjects/Nam_4_ki_1/embedded-system/lab/test/hello_world/build/bootloader-prefix/src/bootloader-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "E:/BK_Subjects/Nam_4_ki_1/embedded-system/lab/test/hello_world/build/bootloader-prefix/src/bootloader-stamp${cfgdir}") # cfgdir has leading slash
endif()
