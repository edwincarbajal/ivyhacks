## Get 🚀
**All Classes** <br>
http://localhost:9000/getClasses <br>
**Get lectures** <br>
http://localhost:9000/getLectures?class=id <br>
**Get notes**<br>
http://localhost:9000/getNotes?class=id&lecture=id
## POST 🏎️
<i>Important:</i> <u>classID</u> must be in format => ABC:123<br><br>
**Add Class** <br>
```
<input  type="text" name="classID"/>
<input  type="text" name="className"/>
<input  type="text" name="classDesc"/>
```
**Add Lecture** <br>
```
<input  type="text" name="classID"/>
<input  type="text" name="lecTitle"/>
<input  type="text" name="lecDate"/>
```
**Add Note** <br>
```
<input  type="text" name="classID"/>
<input  type="text" name="author"/>
<input  type="text" name="data"/>
```
