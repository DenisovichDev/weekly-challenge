#ifndef __UTILS_H__
#define __UTILS_H__

#include <stdint.h>
#include "bmp.h"

int idxIn1D(int x, int y, int width); 

void printArray (unsigned char* imageData, uint32_t size, DIBHeader* bitmapInfo); 

void printCol (color** buffer, int width, int height);

#endif
