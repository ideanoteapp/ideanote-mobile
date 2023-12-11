<template>
  <div class="bg-[#2e2e2e] h-screen" v-if="show">
    <div
      class="fixed top-0 left-0 w-screen h-screen bg-[#00000070] flex justify-center"
    >
      <div class="flex flex-col justify-center">
        <div
          class="flex justify-center bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white"
        >
          <div class="text-center" v-if="slide == 0">
            <img src="../../icon.png" class="inline mb-3" width="64" height="64" />
            <div class="text-2xl font-bold">{{ t.welcome }}</div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                @click="slide = 1"
              >
                {{ t.start_setup }}
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 1">
            <img src="../../icon.png" class="inline mb-3" width="64" height="64" />
            <div class="text-2xl font-bold">
              {{ t.set_notebook_name }}
            </div>
            <p class="opacity-90 text-sm">
              {{ t.notebook_description }}
            </p>
            <input
              type="text"
              v-model="notebookname"
              class="bg-[#3f3f3f] py-2 px-3 rounded-lg text-center mt-4 w-64"
              placeholder="Notebook"
            />
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="go"
              >
                {{ t.next }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<script>
import axios from "axios";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export default {
  data: () => {
    return {
      slide: 0,
      show: false,
      notebookname: "",
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
    };
  },
  mounted() {
    setTimeout(() => {
        this.show = true}
        ,1000
      )
  },
  methods: {
    go(){
      Filesystem.mkdir({
       path: `ideaNote/${this.notebookname}/`,
       directory: Directory.External,
       recursive: true
      }).then((result) => {
        Filesystem.writeFile({
          path: `ideaNote/${this.notebookname}/New Note.md`,
          data: '',
          directory: Directory.External,
          encoding: Encoding.UTF8,
        }).then((result) => {
          Filesystem.writeFile({
            path: `ideaNote/currentnotebook.txt`,
            data: this.notebookname,
            directory: Directory.External,
            encoding: Encoding.UTF8,
            recursive: true
          })
          this.$emit("end", "");
        })

      })
    },
  },
};
</script>
