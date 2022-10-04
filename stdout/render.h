#ifndef __INCLUDES_H__
#define __INCLUDES_H__

#include "bmp.h"

void getBufferArray(unsigned char* imageData, uint32_t size, const unsigned int bSize, color* buffer[bSize], DIBHeader* bitmapInfo, uint32_t frc);

void loadASCIIBuffer(color** buffer, const unsigned int bSize, char symBuffer[bSize]);

void plotImage(char* symBuffer, int width, int height);

void rotate180(char* matrix, int width, int height);

void freeBufferArray(const unsigned int bSize, color* buffer[bSize]); 

#endif
