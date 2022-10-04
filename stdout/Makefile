CC=gcc
CFLAGS=-Wall -g
LIBS=-lm

all: mainapp

mainapp: main.o bmp.o render.o
	$(CC) $(CFLAGS) $^ $(LIBS)
	
%.o: %.c
	$(CC) $(CFLAGS) -c $^

clean:
	rm -f a.out a *.o mainapp
