import os
import subprocess
arr = os.listdir()
print(arr)
import time
while True:
    new_arr = os.listdir()
    if len(new_arr) > len(arr):
        main_list = list(set(new_arr) - set(arr))
        batcmd = "rune run ChatApp.rune --image " + main_list[0]
        result=subprocess.getoutput(batcmd)
        print(result)        
        text_file = open("samples.txt", "w")
        n = text_file.write(result)
        text_file.close()
        arr = new_arr
    time.sleep(1)
