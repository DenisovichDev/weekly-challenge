#ifndef __STRUCT_H__
#define __STRUCT_H__

#include <stdint.h>

// Structure Definitions

#pragma pack(push, 1)

struct BITMAPFLEHEADER {        // For older versions 54 bytes
  uint16_t  signature;          // Magic identifier: 0x4d42
  uint32_t  filesize;           // File size in bytes
  uint16_t  reserved1;          // Not used
  uint16_t  reserved2;          // Not used
  uint32_t  offset;             // Offset to pixel array
};

#pragma pack(pop)

#pragma pack(push, 1)

struct DIBHEADER {              // Bitmap V5 header could be substituted
  uint32_t  DIBHeaderSize;      // DIB or BMP V5 Header size
  int32_t   imgWidth;           // Width of the image
  int32_t   imgHeight;          // Height of image
  uint16_t  numPlanes;          // Number of color planes
  uint16_t  bitsPerPixel;       // Bits per pixel
  uint32_t  compression;        // Compression type
  uint32_t  imageSizeBytes;     // Image size in bytes
  int32_t   xPixelPerMeter;     // Pixels per meter in X
  int32_t   yPixelPerMeter;     // Pixels per meter in Y
  uint32_t  numColors;          // Number of colors in color table 
  uint32_t  impColors;          // Important colors 
};

#pragma pack(pop)

struct COLOR {
	unsigned char r;            // Red Value
	unsigned char g;            // Green value
	unsigned char b;            // Blue value
	unsigned char grey;         // Greyscale value
};

// Type Definitions

typedef struct BITMAPFLEHEADER BMPFileHeader;
typedef struct DIBHEADER DIBHeader;
typedef struct COLOR color;

// Function Prototypes

unsigned char* loadBMP(char *filename, DIBHeader *bitmapInfoHeader);

#endif
