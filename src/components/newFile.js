import EasyMDE from "easymde";
import axios from "axios";
import marked from "marked/marked.min.js";

export default (await import('vue')).defineComponent({
components: {
scrap,
todo,
},
data: () => {
return {
showSidebar: true,
font: "",
currentNotebook: "",
opened: false,
dirs: [],
textarea: "",
notetitle: "",
opening: "/Untitled.txt",
createFolderForm: false,
foldertitle: "",
notes: [],
editing: "",
newNoteMenu: false,
NoteMenu: false,
createNotebookForm: false,
regex: "&&&&untitled-",
notebooks: [],
NotebookMenu: false,
notebookname: "",
ext: "",
openingDir: "",
opening_Dir: "",
sendFeedbackForm: false,
feedback: "",
t: {},
mdParsed: true,
mdContent: "",
easyMDE: undefined,
preferences: false,
t: {
send_feedback: "意見を送る",
create_notebook: "新しいノートブックを作成",
notebook_name: "ノートブック名",
create: "作成",
delete_note: "ノートを削除",
upload: "アップロード",
create_folder: "新しいフォルダ",
new_notebook: "新しいノートブック",
delete_notebook: "ノートブックを削除",
change_icon: "アイコンを変更",
send: "送信",
feedback_ex: "例）〇〇という機能が欲しい",
folder_name: "フォルダの名前",
root: "ルート",
next: "進む",
set_notebook_name: "ノートブックに名前を付けてください",
notebook_description: "ノートブックは、ノートを保管する場所を表します。",
start_setup: "セットアップを開始する",
welcome: "ideaNoteへようこそ",
preferences: "全体設定",
font: "フォント",
copy_path: "パスをコピー",
copy_embed: "埋め込みコードをコピー",
unpin: "ピン留めを解除",
pin_note: "ノートをピン留め",
warning: "警告",
deletenotebook_message: "この動作はノートブックの中のファイルをすべて削除します。",
deletenotebook_message2: "本当にこのノートブックを削除しますか？",
delete: "削除",
cancel: "キャンセル",
update: "アップデートが利用可能です",
update_message_left: "バージョン ",
update_message_right: " へのアップデートが利用可能です。",
update_now: "今すぐアップデートする",
later: "後で",
export_scrap: "スクラップをエクスポート"
},
show: 0
};
},
mounted() {
window.electronAPI.getTexts().then((result) => {
this.t = result;
console.log(this.t);
});

window.electronAPI
.getCurrentNotebook()
.then((result) => {
this.currentNotebook = result;
window.electronAPI.getFiles(this.currentNotebook).then((result) => {
this.notes = result;
window.electronAPI
.getDirs(this.currentNotebook)
.then((result) => {
this.dirs = result;
})
.catch((error) => {
console.error(error);
});
});
})
.catch((error) => {
console.error(error);
})
.catch((error) => {
console.error(error);
});

let textarea_ = "";
},
methods: {
deleteFolder(folder) {
window.electronAPI.deleteFolder(folder).then((result) => {
location.reload();
});
},
pinNote() {
this.notetitle = this.notetitle + " #pin";
this.changeNoteTitle();
},
unpinNote() {
this.notetitle = this.notetitle.replace(" #pin", "");
this.notetitle = this.notetitle.replace("#pin", "");
this.changeNoteTitle();
},
fontChange() {
const app = document.querySelector("#app");
app.style.fontFamily = this.font;
window.electronAPI.setFont(this.font);

},
openPreferences() {
this.preferences = true;
},
copyPath() {
var copyStr = this.opening.replace(this.currentNotebook, "{notebook}");
copyStr = copyStr.replace(/\\/g, "/");
navigator.clipboard.writeText(copyStr);
this.NoteMenu = false;
},
copyImg() {
var copyStr = this.opening.replace(this.currentNotebook, "{notebook}");
copyStr = copyStr.replace(/\\/g, "/");
navigator.clipboard.writeText(`![](${copyStr})`);
this.NoteMenu = false;
},
previewMd() {
this.mdParsed = true;
window.electronAPI.readFile(this.opening).then((result) => {
this.mdContent = marked.parse(result.replace(/{notebook}/g, this.currentNotebook.replace(/\\/g, "/")));
});
},
exportScrap() {
window.electronAPI.exportScrap(this.opening);
this.NoteMenu = false;
},
sendFeedback() {
this.sendFeedbackForm = false;
axios
.post(
`https://app.formester.com/forms/ec2b098d-bc7e-4d23-974a-5862383ff006/submissions.json`,
{ content: this.feedback }
)
.then((response) => {
this.feedback = "";
alert("ご意見ありがとうございました。");
})
.catch((error) => {
// POSTリクエストが失敗した場合の処理
console.error(error);
alert("エラーが発生しました。");
});
},
selectRoot() {
window.electronAPI.getFiles(this.currentNotebook).then((result) => {
this.notes = result;
this.openingDir = "";
});
},
changeNoteTitle() {
document.activeElement.blur();

window.electronAPI
.changeNoteTitle(this.opening, this.notetitle + "." + this.ext)
.then((res) => {
this.readNote(res);
//alert(res)
if (this.openingDir == "") {
window.electronAPI
.getFiles(this.currentNotebook)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});

} else {
window.electronAPI
.openDir(this.openingDir)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
}
});
},
createNotebook() {
window.electronAPI.setCurrentNotebook(this.notebookname);
window.electronAPI.newNotebook(this.notebookname).then((_result) => {
location.reload();
});
},
newFolder() {
this.createFolderForm = true;
},
createFolder(title) {
window.electronAPI
.createFolder(title, this.currentNotebook)
.then((_result) => {
this.createFolderForm = false;
window.electronAPI
.getDirs(this.currentNotebook)
.then((result) => {
this.dirs = result;
})
.catch((error) => {
console.error(error);
});
})
.catch((error) => {
console.error(error);
});
},
save() {
console.log("Saving a note...");
window.electronAPI.saveNote(this.opening, this.textarea);
window.electronAPI.setCurrentNotebook(this.notebook);
if (this.openingDir == "") {
window.electronAPI
.getFiles(this.currentNotebook)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
} else {
window.electronAPI
.openDir(this.openingDir)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
}
},
saveScrap(data) {
console.log("Saving a scrap...");
window.electronAPI.saveNote(this.opening, data);
window.electronAPI.setCurrentNotebook(this.notebook);
},
readNote(notee, md = false) {
this.editor = "";
this.textarea = "";
this.easyMDE = undefined;
const elements = document.querySelectorAll(".EasyMDEContainer");
elements.forEach((element) => {
element.remove();
});

this.opened = true;
try {
this.$refs.editor.style.display = "block";
} catch { }

this.opening = "null.txt";

window.electronAPI
.readFile(notee)
.then((result) => {
this.ext = notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0];
if ((this.notetitle = notee
.replace(/^.*[\\/]/, "")
.match("&&&&untitled-"))) {
this.notetitle = "";
} else {
this.notetitle = notee.replace(/^.*[\\/]/, "");
this.notetitle = this.notetitle.split(".").slice(0, -1).join(".");
}

if (notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "png" &&
notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "jpeg" &&
notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "jpg" &&
notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "webp") {
this.textarea = result;
}
this.opening = notee;

// Markdown
if (notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] == "md") {
this.textarea = result;
this.easyMDE = new EasyMDE({
element: document.getElementById("editor"),
spellChecker: false,
lineWrapping: true,
toolbar: false,
status: false,
forceSync: true,
initialValue: result,
shortcuts: {
togglePreview: null,
toggleFullScreen: null,
toggleSideBySide: null,
},
});

let open = this.opening;
window.electronAPI.readFile(this.opening).then((result) => {
this.mdContent = marked.parse(result.replace(/{notebook}/g, this.currentNotebook.replace(/\\/g, "/")));
});
this.easyMDE.codemirror.on("change", () => {
window.electronAPI.saveNote(open, this.easyMDE.value());
window.electronAPI.readFile(this.opening).then((result) => {
this.mdContent = marked.parse(result.replace(/{notebook}/g, this.currentNotebook.replace(/\\/g, "/")));
});
if (this.openingDir == "") {
window.electronAPI
.getFiles(this.currentNotebook)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
} else {
window.electronAPI
.openDir(this.openingDir)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
}
});
}
})
.catch((error) => {
console.error(error);
});
},
openDir(dir) {
this.openingDir = dir;
window.electronAPI
.openDir(dir)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
},
deleteNotebook() {
window.electronAPI
.deleteNotebook(this.currentNotebook)
.then((_result) => {
window.electronAPI
.setCurrentNotebook(this.notebooks[0])
.then((_result) => {
location.reload();
});
});
},
changeNotebook(n) {
window.electronAPI.setCurrentNotebook(n);
location.reload();
},
openNotebookMenu() {
if (this.NotebookMenu) {
this.NotebookMenu = false;
} else {
window.electronAPI.listNotebooks().then((result) => {
this.notebooks = result;
this.NotebookMenu = true;
});
}
},
changeIcon() {
window.electronAPI.setIcon(this.currentNotebook).then((_result) => {
location.reload();
});
},
uploadFile() {
this.newNoteMenu = false;
if (this.openingDir == "") {
window.electronAPI.uploadFile(this.currentNotebook).then((_result) => {
if (this.openingDir == "") {
window.electronAPI
.getFiles(this.currentNotebook)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
} else {
window.electronAPI
.openDir(this.openingDir)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
}
});
} else {
window.electronAPI.uploadFile(this.openingDir).then((_result) => {
if (this.openingDir == "") {
window.electronAPI
.getFiles(this.currentNotebook)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
} else {
window.electronAPI
.openDir(this.openingDir)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
}
});
}
},
createNote(filetype) {
let noteName = `&&&&untitled-${Math.random()
.toString(36)
.slice(-8)}.${filetype}`;
console.log(
"Creating note to " +
this.currentNotebook +
"\\" +
this.openingDir.replace(/^.*[\\/]/, "") +
"\\" +
noteName
);
//window.electronAPI.createNote(this.currentNotebook+"\\"+(this.openingDir+"\\")+noteName, "")
window.electronAPI
.createNote(
`${this.currentNotebook}/${this.openingDir.replace(
/^.*[\\/]/,
""
)}/${noteName}`,
""
)
.then((_result) => {
this.notetitle = "";
this.textarea = "";
this.opening =
this.currentNotebook + "\\" + this.openingDir + "\\" + noteName;

this.readNote(`${this.currentNotebook}/${this.openingDir.replace(/^.*[\\/]/, "")}/${noteName}`);
});
if (this.openingDir == "") {
window.electronAPI
.getFiles(this.currentNotebook)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
} else {
window.electronAPI
.openDir(this.openingDir)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
}

this.newNoteMenu = false;
},
deleteNote() {
window.electronAPI.deleteNote(this.opening).then((_result) => {
this.NoteMenu = false;
this.notetitle = "";
this.opening = this.currentNotebook;

if (this.openingDir == "") {
window.electronAPI
.getFiles(this.currentNotebook)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
} else {
window.electronAPI
.openDir(this.openingDir)
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
}
});
},
createScrap() {
let noteName = `&&&&untitled-${Math.random().toString(36).slice(-8)}`;
window.electronAPI
.saveNote(this.currentNotebook + noteName, "")
.then((result) => {
alert(result);
this.notetitle = result[1].replace(/^.*[\\/]/, "");
this.textarea = result[0];
this.opening = result[1];
});
this.newNoteMenu = false;
window.electronAPI
.getFiles()
.then((result) => {
this.notes = result;
})
.catch((error) => {
console.error(error);
});
},
},
});
