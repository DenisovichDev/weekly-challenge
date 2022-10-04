# Birb Wiggle

Made for @sableRaph and his ridiculous community.

## How to run 
- Clone this repo to your machine
- Make sure you are in a Linux/Unix environment (For Windows, use WSL)
- Make sure you have the GNU Compiler Collection (gcc) and GNU Make Utility (make) installed
- To compile the project, use the command `make`.
- If you don't have `make`, don't worry. Use this command: 
```sh
$ gcc -Wall -g main.c bmp.c render.c -lm
``` 
- Execute the binary that was generated. It usually would be `a.out`:
```sh
$ ./a.out
```
- To stop, `Ctrl + C`  

Here's a [preview of the output](https://www.youtube.com/watch?v=oTxaS_L3Ud8) on YouTube. And here's one of the frames.
```
                  ,-,.
                -=!!!!;:.
               ,#*!=!*!*!-
               *@**!!*!=!#~
              ,@$#*****!=**.
              :@##*!**##*!#-
              =@#$#***#####-
              =$@!~:;*###!!-
             ,-;$~ ,:!###!#!
             .:!#:~;=!$##**!
             .$$***###$:;;=:
             -@$**##*$! ,*=
             =@;~:*###- :=.
            .;-   ,#*- .;
            ,,:#=:,~, .-~
           .--!!;~,  . --
           .-~, .  ..  =,
           ,-,.,,...  =$.
           --,...   ~*$#,
           ,~,    ,=#$##!.
             .-::=*#*###**:
            ~!###**!*#*=!#$;.
        ..~*$*=**!!!!==!***#*:
      -=**$$#*!!!!!=:;*****!*$=
    .!$$#######*!==;;=*****!!*@~
    *@$########*#;;!=!********@:
   :@$##########*!=!!*********@:
  .#@$$##########!=********#**$;
  -@##$$#########**#******##**#*
  ~@##$$$#######*##*#****###***$-
  ,$$##$$#########*##**#*####*!#*
   !@##$$########**#**###**###=!$;
   ,$$###$#######******###*#*#*=*#:
```

## Unfunny Comments Unlike Jeremy
This took 2 weeks to make. Not because it was super hard or anything, it's just that I am too lazy. I started this when the topic was "Raphaël de Courville, Processing Community Lead Fellow". Then I started to think about making it Rain, since that was the topic for next week. Now this.

Okay, so of course I didn't use any libraries at all (except for the GNU C Standard Library). Instead I made [my own library](https://github.com/DenisovichDev/bmplib) to read the individual bytes from a BMP image file and save it to a `struct` (check `bmp.c`, I swear it is pretty cool). I can go on about how cool it is, but I really shouldn't. Still I'll try to explain the code in the best way I can.

The pixel array in a bitmap is saved similar to a one dimensional array of singular bytes (8 bits each for R, G, B etc). So I openned the file in binary read mode, saved the metadata (image width, height, bits per pixels etc are saved here) and the image array into a couple of structures, and then used a function to create an array of pointers (or addresses) to individual color structures saved in the heap. A color structure, that I defined in `bmp.h`, is just similar to a Javascript object (please don't kill me, fellow C people) that contains RGBA informations.

You can guess what happens next, I map the greyscale values to specific ASCII characters (check `loadASCIIBuffer()` in `render.c`). All this was easier said then done. But hey, I finally finished it.

 The execution loop happens in `main.c`, check that out if you want too.

 I hope you ran it live! If not, please do it when you get time after the stream.
