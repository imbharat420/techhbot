// const { spawn } = require('child_process');

import axios from 'axios';
import FormData from 'form-data';
import errorHandler from '../utils/errorHandler';

const RunCode = async (code: string, language: string, input: string) => {
  const lang = language.toLowerCase();
  console.log(lang, language, input);

  const formData = new FormData();
  formData.append('LanguageChoiceWrapper', language);
  formData.append('EditorChoiceWrapper', '1');
  formData.append('LayoutChoiceWrapper', '1');
  formData.append('Program', code);
  formData.append('Input', input);
  formData.append('Privacy', '');
  formData.append('PrivacyUsers', '');
  formData.append('Title', '');
  formData.append('SavedOutput', '');
  formData.append('WholeError', '');
  formData.append('WholeWarning', '');
  formData.append('StatsToSave', '');
  formData.append('CodeGuid', '');
  formData.append('IsInEditMode', 'False');
  formData.append('IsLive', 'False');
  if (lang === 'c++ (gcc)') {
    formData.append('CompilerArgs', '-Wall -std=c++14 -O2 -o a.out source_file.cpp');
  }

  if (lang === 'c (gcc)') {
    formData.append('CompilerArgs', '-Wall -std=gnu99 -O2 -o a.out source_file.c');
  }

  try {
    const response = await axios.post(process.env.RUN_CODE as string, formData);
    console.log(response.data);
    let errorMsg = '⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️\n';
    if (response.data.Stats !== null) {
      errorMsg += response.data.Stats + '\n';
      //   return response.data.Stats;
    }
    if (response.data.Errors !== null) {
      console.log(response.data.Errors);
      errorMsg += response.data.Errors + '\n';
      errorMsg += '⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️\n';
      return errorMsg;
    }
    if (response.data.Warnings === null) {
      return 'sorry some error occured';
      //   return response.data.Warnings;
    }
    return response.data.Result;
  } catch (err) {
    return errorHandler(err);
  }
};

export default RunCode;

/*



### C++ (GCC)
LanguageChoiceWrapper: 6
EditorChoiceWrapper: 1
LayoutChoiceWrapper: 1
Program: //gcc 7.4.0

#include  <stdio.h>

int main(void)
{
    printf("Hello, world!\n");
    return 0;
}
CompilerArgs: -Wall -std=gnu99 -O2 -o a.out source_file.c
Input: 
ShowWarnings: false
Privacy: 
PrivacyUsers: 
Title: 
SavedOutput: 
WholeError: 
WholeWarning: 
StatsToSave: 
CodeGuid: 
IsInEditMode: False
IsLive: False

{
    "Warnings": null,
    "Errors": "926184743/source.c: In function ‘main’:\n926184743/source.c:8:5: error: expected ‘;’ before ‘return’\n     return 0;\n     ^~~~~~\n",
    "Result": null,
    "Stats": "Compilation time: 0.12 sec, absolute service time: 0,3 sec",
    "Files": null,
    "NotLoggedIn": false
}


 ###JS

 const data = {
    LanguageChoiceWrapper: 23,
    EditorChoiceWrapper: 1,
    LayoutChoiceWrapper: 1,
    Program: `while(true){
        console.log("Hello, World!");
        }`,
    Input: '',
    Privacy: '',
    PrivacyUsers: '',
    Title: '',
    SavedOutput: '',
    WholeError: '',
    WholeWarning: '',
    StatsToSave: '',
    CodeGuid: '',
    IsInEditMode: 'False',
    IsLive: 'False',
  };
  

https://rextester.com/rundotnet/Run


{
    "Warnings": null,
    "Errors": "FATAL ERROR: NewSpace::Rebalance Allocation failed - process out of memory\n 1: node::Abort() [nodejs]\n 2: 0x563cca7c0011 [nodejs]\n 3: v8::Utils::ReportOOMFailure(char const*, bool) [nodejs]\n 4: v8::internal::V8::FatalProcessOutOfMemory(char const*, bool) [nodejs]\n 5: v8::internal::MarkCompactCollector::Evacuate() [nodejs]\n 6: v8::internal::MarkCompactCollector::CollectGarbage() [nodejs]\n 7: v8::internal::Heap::MarkCompact() [nodejs]\n 8: v8::internal::Heap::PerformGarbageCollection(v8::internal::GarbageCollector, v8::GCCallbackFlags) [nodejs]\n 9: v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [nodejs]\n10: v8::internal::Factory::NewFillerObject(int, bool, v8::internal::AllocationSpace) [nodejs]\n11: v8::internal::Runtime_AllocateInTargetSpace(int, v8::internal::Object**, v8::internal::Isolate*) [nodejs]\n12: 0x2a99c4e040bd\n\nAbort signal from abort(3) (SIGABRT)",
    "Result": "Hello, World!\nHello...",
    "Stats": "Absolute running time: 2.5 sec, cpu time: 3.64 sec, memory peak: 216 Mb, absolute service time: 2,6 sec",
    "Files": null,
    "NotLoggedIn": false
}


[{"key":"LanguageChoiceWrapper","value":"23","description":"","type":"text","enabled":true},{"key":"EditorChoiceWrapper","value":"1","description":"","type":"text","enabled":true},{"key":"LayoutChoiceWrapper","value":"1","description":"","type":"text","enabled":true},{"key":"Program","value":"console.log(\"Hello, World!\");","description":"","type":"text","enabled":true},{"key":"Input","value":"","description":"","type":"text","enabled":true},{"key":"Privacy","value":"","description":"","type":"text","enabled":true},{"key":"PrivacyUsers","value":"","description":"","type":"text","enabled":true},{"key":"Title","value":"","description":"","type":"text","enabled":true},{"key":"SavedOutput","value":"","description":"","type":"text","enabled":true},{"key":"WholeError","value":"","description":"","type":"text","enabled":true},{"key":"WholeWarning","value":"","description":"","type":"text","enabled":true},{"key":"StatsToSave","value":"","description":"","type":"text","enabled":true},{"key":"CodeGuid","value":"","description":"","type":"text","enabled":true},{"key":"IsInEditMode","value":"False","description":"","type":"text","enabled":true},{"key":"IsLive","value":"False","description":"","type":"text","enabled":true}]


LanguageChoiceWrapper: 23
EditorChoiceWrapper: 1
LayoutChoiceWrapper: 1
Program: while(true){
console.log("Hello, World!");
}
Input: 
Privacy: 
PrivacyUsers: 
Title: 
SavedOutput: 
WholeError: 
WholeWarning: 
StatsToSave: 
CodeGuid: 
IsInEditMode: False
IsLive: False

{
    "Warnings": null,
    "Errors": "FATAL ERROR: NewSpace::Rebalance Allocation failed - process out of memory\n 1: node::Abort() [nodejs]\n 2: 0x563cca7c0011 [nodejs]\n 3: v8::Utils::ReportOOMFailure(char const*, bool) [nodejs]\n 4: v8::internal::V8::FatalProcessOutOfMemory(char const*, bool) [nodejs]\n 5: v8::internal::MarkCompactCollector::Evacuate() [nodejs]\n 6: v8::internal::MarkCompactCollector::CollectGarbage() [nodejs]\n 7: v8::internal::Heap::MarkCompact() [nodejs]\n 8: v8::internal::Heap::PerformGarbageCollection(v8::internal::GarbageCollector, v8::GCCallbackFlags) [nodejs]\n 9: v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [nodejs]\n10: v8::internal::Factory::NewFillerObject(int, bool, v8::internal::AllocationSpace) [nodejs]\n11: v8::internal::Runtime_AllocateInTargetSpace(int, v8::internal::Object**, v8::internal::Isolate*) [nodejs]\n12: 0x2a99c4e040bd\n\nAbort signal from abort(3) (SIGABRT)",
    "Result": "Hello, World!\nHello, World! ....  .....",
    "Stats": "Absolute running time: 2.5 sec, cpu time: 3.64 sec, memory peak: 216 Mb, absolute service time: 2,6 sec",
    "Files": null,
    "NotLoggedIn": false
}


const layoutChoiceWrapper = {
    "assembly": "1",
    "bash": "1",

}
<select class="langdropdown" id="LanguageChoiceWrapper" name="LanguageChoiceWrapper" fdprocessedid="h2hz5p"><option value="39">Ada</option>
<option value="15">Assembly</option>
<option value="38">Bash</option>
<option value="1">C#</option>
<option value="7">C++ (gcc)</option>
<option value="27">C++ (clang)</option>
<option value="28">C++ (vc++)</option>
<option selected="selected" value="6">C (gcc)</option>
<option value="26">C (clang)</option>
<option value="29">C (vc)</option>
<option value="36">Client Side</option>
<option value="47">Clojure</option>
<option value="18">Common Lisp</option>
<option value="30">D</option>
<option value="41">Elixir</option>
<option value="40">Erlang</option>
<option value="3">F#</option>
<option value="45">Fortran</option>
<option value="20">Go</option>
<option value="11">Haskell</option>
<option value="4">Java</option>
<option value="17">Javascript</option>
<option value="43">Kotlin</option>
<option value="14">Lua</option>
<option value="33">MySql</option>
<option value="23">Node.js</option>
<option value="42">Ocaml</option>
<option value="25">Octave</option>
<option value="10">Objective-C</option>
<option value="35">Oracle</option>
<option value="9">Pascal</option>
<option value="13">Perl</option>
<option value="8">Php</option>
<option value="34">PostgreSQL</option>
<option value="19">Prolog</option>
<option value="5">Python</option>
<option value="24">Python 3</option>
<option value="31">R</option>
<option value="46">Rust</option>
<option value="12">Ruby</option>
<option value="21">Scala</option>
<option value="22">Scheme</option>
<option value="16">Sql Server</option>
<option value="37">Swift</option>
<option value="32">Tcl</option>
<option value="2">Visual Basic</option>
</select>
*/
