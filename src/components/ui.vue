<template>
  <div>
    <div class="flex max-h-screen max-w-[100vw] h-screen overflow-hidden">
      <div
        class="fixed left-[180px] lg:left-[200px] w-screen h-screen bg-black opacity-60"
        v-if="false"
      ></div>
      <Transition name="slide-fade">
      <div
        id="sidebar1"
        class="block bg-[#262626] w-full z-10 h-screen select-none overflow-x-hidden"
        v-if="show == 0"
      >
        <div
          class="bg-[#202020] hover:bg-[#1d1d1d] duration-200 h-[54px] text-white flex px-4"
          @click="openNotebookMenu"
        >
          <div class="flex flex-col justify-center">
            <img
              :src="`${currentNotebook}/.icon.png`"
              alt=""
              v-if="notes.includes('.icon.png')"
              class="w-[27px] h-[27px] bg-white rounded-full"
            />
            <img
              src="data:image/png;base64,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"
              alt=""
              v-else
              class="w-[27px] h-[27px] bg-white rounded-full"
            />
          </div>

          <div class="flex flex-col justify-center ml-2.5 flex-grow mb-0.5">
            {{ currentNotebook.replace(/^.*[\\/]/, "") }}
          </div>

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <font-awesome-icon icon="fa-solid fa-caret-down" />
          </div>
        </div>
        <div
          class="before:fixed before:top-0 before:left-0 before:w-screen before:h-screen before:bg-black before:opacity-50"
          v-if="NotebookMenu"
          @click="openNotebookMenu"
        ></div>
        <Transition name="slide-up">
        <div
          v-if="NotebookMenu"
          @click="openNotebookMenu"
          class="overflow-scroll absolute bg-[#262626] z-50 w-full h-full rounded-lg top-10 py-3 shadow-md border border-[#5f5f5f]"
        >
          <div class="flex px-4">
            <img
              :src="`${currentNotebook}/.icon.png`"
              v-if="notes.includes('.icon.png')"
              class="rounded-full w-7 h-7"
            />
            <img
              src="data:image/png;base64,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"
              v-else
              class="rounded-full w-7 h-7"
            />
            <div class="ml-2">
              <div class="text-[1.1rem] font-semibold text-white">
                {{ currentNotebook.replace(/^.*[\\/]/, "") }}
              </div>
            </div>
          </div>

          <!--<div class="hover:bg-[#3f3f3f] mt-2 text-white z-50">
            <button class="px-4 pb-1" @click="changeIcon">
              <font-awesome-icon
                icon="fa-solid fa-star"
                class="w-6 textt-[#FFB800] text-[#ffcd42] text-[1.2rem] mr-1 mt-1 before"
              />
              {{ t.change_icon }}
            </button>
          </div>-->

          <!--<div class="hover:bg-[#3f3f3f] px-4 pb-1 text-white z-50">
                <font-awesome-icon icon="fa-solid fa-gear" class="text-sm w-6 textt-[#FFB800] mt-1 text-[#42ff6b] text-[1.2rem] mr-1 before" />
                ノートブック設定
              </div>-->
          
          <!--
          <div class="hover:bg-[#3f3f3f] mt-2 text-white z-50">
            <button class="px-4 pb-1 text-left flex" @click="deleteNotebook">
              <font-awesome-icon
                icon="fa-solid fa-trash"
                class="text-sm w-6 textt-[#FFB800] mt-1 text-[#ff4242] text-[1.2rem] mr-2 before"
              />
              <div>
                {{ t.delete_notebook }}
              </div>
            </button>
          </div>
          -->

          <div class="bg-[#5f5f5f] w-full h-px mt-2 mb-2"></div>

          <div class="hover:bg-[#3a3a3a]" v-for="n in notebooks">
            <button
              v-if="n.name != currentNotebook"
              class="flex px-4 py-1.5 w-full h-full"
              @click="changeNotebook(n)"
            >
              <img
                :src="`${n.name}/.icon.png`"
                v-if="notes.includes('.icon.png')"
                class="w-7 h-7 rounded-full"
              />
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAOwAAADsAEnxA+tAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAADlpJREFUeJy9W22MXFUZft47H7ulOzu7ywIByocF+kGLCZCgREQSkcTEEAEBIYBFBCofIgn8wMRof0hIBFEgLaKAIlKSWiFAgkZiRAQTVH4YChQEYkA+S+nOzHbZuTPn8cc9H++5c2e7dHc4P3buPffcc573Pe/3uSskMdC2eXQSS0onGZGjE2AlgCNJHiCSLCW4DwAIZDdppgF5V4T/AWR713BbCd2/4YzGB4OEJwNhwMNjxwNyHiGnAjwGkCR7oNcSAAQBiL3O+rLe7EoMwH+T8kRSKW3GV95/brGhLhoDdtwjtYmJscuEcjHBNWEFBLr1NQARAUlE9NP2g1GfbdsSJPeglPwCp7/fXAzcC2fAlvqEKSfXQHA1iXEAuf2Mr3XLdto+ESDPi77vEjsB3J50zW04e2rnQuDvPQNEpPv7sQtB3gyR/TL0CqrfPdXPaPtzfRJTSlpJCPcQyf9+aIzZUHm+cTt+QLNXZOwNA2YfGl1RYvJrEfmse9+Ls54cmSi7Z/7eEpvvo5L1fvd95nimQ7Nu6KypVwbOgO7WsbMouJtEXZScEnZTowv0CEbv2Iw8knacqEER1DDGPovmJpoiyfrSmTsf+Dj0JPMfuiFJt47fboDfOeId7/I6CxKk0mk3LjeQyHbQbUL2jsl+AdWHaAzU2n4MUDM0v+08NP5TbJB50zU/CdiyttpO3rhPIOf2PKN1ZRKbLVKLPnrGkPpeUSK5d+2YvKrFz8OalqyHqpPj5+OU1z9aOAMeP2qoPf3eIwBO6/FjznB5u1Tg77yoBOKDvSjykfGvHhutYefttT3Oq/CPVXPI6Tj7+fbeM2CDJO01o5tJnKNo9YFLJu6ImIDhg5CMfxoYmgRowLQJ6TTBtAF2mkCnBaTZrzfoiOd2uu7nR+w08s4gw6Ykw+kX+PAQml/D2ez2I7E8F3dmV4/eBuAcdx903qFyD+ztxPGoHHl5QFtfC4we3X+B9i6w0wI6TTBtAd3prM8yCJ1W9jzdBbZt38xb4NTzcGrk1qc4G6GwUb46i9FbhoDv9oPQVwLaW8bONeCDYQXEYqdMsRPDoeN/DKmOq9kT4OAzACn1Z8JeNE5tQ/r3dTCN7VE06YMqWEYEEblw+Jyp+4vmKrSWs1vrRxmau/xEkEjuSMV9raOaeACgAbp7tEMfu0l9DSqnPAZUaorQDKtxXkXrCbipvXV0VdFcvQzYIInp8n4Co1467KTexSHonO8vDRejTebUsr1uMnwASp+6ULlSZUOg3SZBYMR05Z4NBe6xp2N2df0ykie4ezexm9DoX88fAslQH6SVBZA5d5PaCgsAPjYg2IM1YwJPvH5l7eL8HBEDmptHJ7s0P/IvOQKNW8HeK2PoVaRIAiQJmfAgmkm9BPp4gy4mAEJs4O3ETY0t9Qk9RYROhNcCnHAvw03oXJCyvMGP28kLGTC43QcApo2wfgE+jzFs5mTZmGv0HIEBj+87CuKK3glCKBoTH49BaZ9ehAPSf9eYNnMY4a/9GHqn7Wi4Blsm6h6iu5jela4XwViIvQsWRI4R6l6qY70vDFwCmjkCHS61Meihp95M25e6G88AghdHMYGEHSZjo+eewasKgUodPS0ZPAOcbYqNc7ADMSMyNyki3/QQAWDmwfpnCKwKO0rQuMqcyuWVQdEWlwCkWsSAT0YFQujrWrBfMU5x9YTVUw8sPd4zIDXd8/K7b2eIXAkkJwnBOgLl0V6En4QRVPmUw+aDISAkG4glOpHS+YDNBQT4kuOQVihxEZZP6l3V1t3D+2CpzM8Idt54BN3GS5DyCKS8FKiMQiqjkMpSwPZJdTx7tgcVYtpEVgjLIj6dW3q4xngmhASLAMypAFBu/aa2P0tYHfv5TFiM/dUFmpBxAWLFSygZ4HwrkID0zceQvvZAXN7Kl8xceJ0MYXjt9Rg65oZiBrSb0fgQCYZiq8MJwNNjb49p3Vvbr9xNcDIMbRlelbI8J6kqMPaZIWJhISQpiAMKdlCGJiFLDwe6LaAzDaa74TgcZ3QCmFlA+tsR047jgBDwxDWCUGIPdUYaSqdsPl8mzVqfNzguqsJDbyHWiVH2x9+XiwKhXvDDx92I4eNuDB00Wa0gbYDpdJYCpy0w3QWm0yjte2xfBqDTjAj15JHajOVE31WiCIisKZNc6XTbOPGOAgn3m+2KMaFMpZ9LUS4wHzcoCaQ6VhxHzNVMim66O8Li8Ptr7w2C6gKAMcZey8oyBEcFAjVR2orGpafICGaDil1egQTsfuYymI92QCojkEodUqlBKiNAeWl2Xa17AymVESSjKyDlXgPLtBXODXJRG3N44w3T9USsKAMyme1qRoi+9roZLRIKndoHSVHRo0AC0rf/jO70W1GxM1/YDHgFI6c+gsqBXyxgQCNEofb9yE5FYXFImOAMd3Y/WYZBzQ8UtcOBct/nbYPE4zPHOj8GMG15wn2f1yNtuLJ5pVIQX8BFgep90e8F3Lp8b+M6Pa6WUDjiJzLBCmeRoFoQhInsgdUt25krcNsF8ypAdB0DNHiFmW5eJ76VERQ1po0439fBjsLsIkGHFwzjSdaSEB1p9yG+sBmllXAxt3IzImC/85WcBLCzGzRdv7sBaI4Zag0p1/owoBmE1G6zNl1RHUCpsaZFRCQBpRXl/orofCqpEVONkyIXCPQEQk5sdREj5BaMpMC77r4S0OwhkLnN0cURf60Y0SWbCcFWliV52ryoaLAuxs4uY6uL0pJiBuQ8g9dbZToi8UTYBEOTuepyMQNMu5EjVL2vmejsg1IrR6MAjYTkDm8YGN70jFChsGeI1yOrp4XVoDLyloFpS+2+XYexxQ5VHQHKS/pmlEybPsILu2/fdzg1UxxVFrvlyQcJIK8Ytf0uoqYVA5dDBxZooqzbLGJAAXCntwFUOFnRhtXPXinWfwAwbasCmkCtpkq1QoyoU3mAxrxcJrE9+N9AeCA2ZkiOpOynCGhBImTSZhRThDU1U5RI9xF/AFE5LEzpZV3h0HlBTlWA7YlAXoiNUhhmjAFzL0Yg7MKl/IEIUBwDtBsKLJR0xWrgsc8pAQ0l4hqRsmMAvHT7sVT04cWyVOSvbGcpbTjzU+7QvRCd8tKPERHIUEEcX6ACxu9aKFt7HQYBSpR59nOBgPYo2VhSHVR6F45oPh0JkWSpVHmqPHnB9Nvv3jv8EslVotxE/ElKQR/Vb1E5rEAFliw/F9X9TwQ70zBpC2xP+SyQnVbGoNkpsNPKMsGx1X0ZYNKGT8tD0qOKOE69jKpfIEi5QLbtt671ThkAaMwTgKwysDG+uGJIsKoCwD13vxRbXirS1aJaQLWO8sQxfYn6OI3tppdKg94PKSJbY/943JmQPAHYmqAx3Kw5lLfIUalJjfMaUy2qBg22INpVcQAQdDtyBAguUtsWAEhpNgOWAQddmj4D4mXDoD+uGWeo1ATejVhRSwoPRQZfEI2ixzyFDIFb2DXf98qyS9J/AOpcwBhzH4AsCfKhaTAcBKNnIawEpFIQCQ5YAozzKCYOeDxO36eCN2dxDe518h0ORkr7bALQDFZTW1jLCF8nCP0E5l0PXMzGdDq76Ml3gzP0xAPaVzbSTvtOD9NdLLtkaqcxcmfeH2ufrSfU/lVKBcQO8EyAnd0w3XaER++0xu3fCQy549Bv80PXH+Wxs6Z9syGnsgnyAUocpUUlp6LdHuCpkBf/HJVxNhsMeib+AgAfJlhyawRT3xyxnu+JyPf9LkdEh+DInbz46DH/vR8wWAmwSVWEJdow6bFfIGEMvnfgZY0deq6eSsaysXQjIc8BOnCIzwMthQFQd6YXZanPFyOL0Mzsh5FR814JOTdu7VQWsOGfh7yT3pWfq7eUcza7FLkI5G4fT+f8rXcnBAyBmbefjeewR16Dau33/+U9EAAb7ir9V2mvZco0kXyj6IvywlrWoZfObjNdfMdxFdDWtNce7HrxAUz/7+ms3FUZByZPQp8q4YKbmXkfU8/dFGHyeYXHK/4XACi88tDLZ18omm/OL0X/u6n8SxG5JJy1WX1XqqA/a3fXSaUGqdZQqtSAyghKQ+OQSg1JtZY9q4wgqdaRVOv2umaf277qSDYudx4w+87T2PnUVUg/eN5j0fiLPtkn8PPD13fW96NxTlP97GT38hN2lsZBnOknJtXmxv/yQgvKtJtA2kTf71MtMhVS6NIDXLwiSQlJZRTJ0BhMuwnz0Y44Ls+l6f5Mw4UtIo8e9k7nqrlg7PFj6TdvlSWdJaU/CHFylKoqS6sx+fV70lDXp//ZITwvfhbHOUXraA7m1n6y/FH3y8uuZYGFDm2P37Atu5YznbR7GoCtGrAuaemSWXBLMfEuMnPvZoFU7GEib2Op1gGXjui8C/bsCFbfGDz69jyIB+YhAa79ZYOUD5tMNkHwLbeo37XcOVx+zvw3/qHPkzWPsXvGaVPiuw6f7F4x1xfi0TvzZYBrr28sXwRyIwRL9Qb0s/lerRnEea5P36PP51W/XkPLlWozBG5YfkX3Zx+Hnr36p6lXb5O1STm5j8Cxvibgzw1ziPNUOcrdTexcYoHoUfrcvEH0n6PhhUdezUJXN1dbwP8NSvLq7bgASfITgPvm3aEFFpWrXPkq6tcG1dMXexf3eX7PvOQuQH64/ABzx3xFfhEZkLVX75T90U2uo+F6SaQWy61eKRRYpeA6Nvd7uBY0RWQTd5tbjriO7y0E/6L96+ybd8vEzAyuFMg6AMudWAMFuq0BIIi+VgP1dZuSEL4qSfKrobbZuOxaLug/Rv36i8UANaW8trH8OdM1Xyd4qghWBmkOVVv4zXSvKQPJSDW2iyR/EpgHj7gKz/SK1gLRLj4D4vbmnfscPNOZ+YIwWUOYFSBWIJF9QYwArFvWTEGkBfIDAC9Dku2g2TYsePKQq/jWIPH9H9cEeW20z7LSAAAAAElFTkSuQmCC"
                v-else
                class="w-7 h-7 rounded-full"
              />
              <div class="ml-2">
                <div class="text-[1.1rem] font-semibold text-white">
                  {{ n.name.replace(/^.*[\\/]/, "") }}
                </div>
              </div>
            </button>
          </div>

          <div class="hover:bg-[#3f3f3f] mt-2 text-white z-50">
            <button class="px-4 pb-1 text-left flex" @click="this.createNotebookForm = true">
              <font-awesome-icon
                icon="fa-solid fa-plus"
                class="w-6 textt-[#FFB800] text-[1.2rem] mr-2 mt-1 before"
              />
              {{ t.new_notebook }}
            </button>
          </div>

          <!--
          <div class="bg-[#5f5f5f] w-full h-px mt-2 mb-2"></div>

          
          <div
            class="hover:bg-[#3f3f3f] text-white z-50"
            @click="openPreferences"
          >
            <button class="px-4 pb-1">
              <font-awesome-icon
                icon="fa-solid fa-gear"
                class="text-sm w-6 textt-[#FFB800] mt-1 text-[#f3f3f3] text-[1.2rem] mr-1 before"
              />
              {{t.preferences}}
            </button>
          </div>
          -->
        </div>
        </Transition>

        <div
          @click="selectRoot"
          class="mx-2 text-white mt-3 hover:bg-[#353535] rounded-lg select-none"
          :class="{ 'bg-[#353535]': openingDir == '' }"
        >
          <button class="flex py-2 px-2 w-full">
            <img
              src="../assets/root.png"
              alt=""
              class="w-[29px] h-[29px] mr-2 bg-[#ff3f3f] rounded-full"
            />
            <div class="flex flex-col text-left justify-center mb-1">
              {{ t.root }}
            </div>
          </button>
        </div>

        <div
          class="mx-2 text-white flex mt-1 hover:bg-[#353535] rounded-lg group"
          v-for="i in dirs"
          @click="openDir(i)"
          :class="{ 'bg-[#353535]': openingDir == i.name }"
        >
          <button class="flex py-2 px-2 w-full" v-if="i.name.replace(/^.*[\\/]/, '').charAt(0) !== '.'">
            <img
              src="../assets/folder.png"
              alt=""
              class="w-[29px] h-[29px] bg-[#353535] mr-2 rounded-full border-none"
            />
            <div class="flex flex-col text-left justify-center mb-1 flex-grow">
              {{ i.name.replace(/^.*[\\/]/, "") }}
            </div>
          </button>
        </div>

        <div
          class="px-2 mx-2 text-white flex mt-3 py-1 rounded-lg opacity-90 hover:opacity-100 group duration-100"
          @click="newFolder"
        >
          <font-awesome-icon
            icon="fa-solid fa-circle-plus"
            class="text-[20px] mr-2 duration-100"
          />
          <div class="flex flex-col justify-center mb-1 text-sm">
            {{ t.create_folder }}
          </div>
        </div>
      </div>
      </Transition>
      <Transition name="slide-fade">
      <div
        id="sidebar2"
        v-if="show == 1"
        class="block bg-[#2E2E2E] text-white w-full h-screen absolute"
      >
        <div
          class="bg-[#242424] duration-200 h-[54px] w-full text-white flex px-4"
        >
          <!--<div class="flex flex-col justify-center">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-[20px] opacity-90"/>
          </div>-->

          <button @click="this.show = 0">
              <font-awesome-icon
                icon="fa-solid fa-arrow-left"
                class="text-[20px] mr-1"
              />
            </button>

          <div
            class="flex flex-col justify-center ml-2.5 flex-grow mb-0.5 text-center"
          >
            <!--{{ openingDir.replace(/^.*[\\/]/, "") }}-->
          </div>

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <button @click="createNote('scrap')">
              <font-awesome-icon
                icon="fa-solid fa-scroll"
                class="text-[20px] mr-1"
              />
            </button>
          </div>

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <button @click="createNote('md')">
              <font-awesome-icon
                icon="fa-regular fa-file-lines"
                class="text-[20px] mr-1"
              />
            </button>
          </div>

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <button @click="this.newNoteMenu = !this.newNoteMenu">
              <font-awesome-icon
                icon="fa-solid fa-circle-plus"
                class="text-[22px] oapcity-90"
              />
            </button>
            <Transition name="slide-up">
            <div
              v-if="newNoteMenu"
              class="absolute right-1 bg-[#262626] z-50 w-44 rounded-lg top-10 py-3 shadow-md border border-[#5f5f5f]"
            >
              <div
                class="hover:bg-[#3f3f3f] px-4 pb-1"
                @click="createNote('md')"
              >
                <font-awesome-icon
                  icon="fa-regular fa-file-lines"
                  class="w-6 textt-[#FFB800] text-[#ffcd42] text-[1.24rem] mr-2 mt-1 before"
                />
                Markdown
              </div>
              <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="createNote('txt')"
              >
                <font-awesome-icon
                  icon="fa-solid fa-t"
                  class="w-6 textt-[#FFB800] text-[#628eff] text-[1.24rem] mr-2 mt-1 before"
                />
                Plaintext
              </div>
              <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="createNote('scrap')"
              >
                <font-awesome-icon
                  icon="fa-solid fa-scroll"
                  class="w-6 textt-[#FFB800] text-[#ffd562] text-[1.24rem] mr-2 mt-1 before"
                />
                Scrap
              </div>
              <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="createNote('todo')"
              >
                <font-awesome-icon
                  icon="fa-regular fa-square-check"
                  class="w-6 textt-[#FFB800] text-[#4ae245] text-[1.24rem] mr-2 mt-1 before"
                />
                ToDo
              </div>
            </div>
            </Transition>
          </div>
        </div>

        <div
          class="overflow-y-scroll max-h-[calc(100vh-54px)] overflow-x-hidden"
        >
          <div
            v-for="n in notes"
            @click="readNote(n.name, true)"
            class="flex border-b border-b-[#ffffff15] py-3 px-5 duration-200 hover:bg-[#2b2b2b] hover:bg-[#ffffff10] w-full"
            :class="{ 'bg-[#2b2b2b] bg-[#ffffff10]': n.name == opening }"
          >
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'txt'"
              icon="fa-regular fa-file-lines"
              class="textt-[#FFB800] text-[#427eff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'png'"
              icon="fa-regular fa-image"
              class="textt-[#FFB800] text-[#b342ff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'webp'"
              icon="fa-regular fa-image"
              class="textt-[#FFB800] text-[#b342ff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'jpg'"
              icon="fa-regular fa-image"
              class="textt-[#FFB800] text-[#b342ff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'jpeg'"
              icon="fa-regular fa-image"
              class="textt-[#FFB800] text-[#b342ff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'mp3'"
              icon="fa-solid fa-music"
              class="textt-[#FFB800] text-[#7b42ff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'wav'"
              icon="fa-solid fa-music"
              class="textt-[#FFB800] text-[#7b42ff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'md'"
              icon="fa-regular fa-file-lines"
              class="textt-[#FFB800] text-[#ffcd42] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="
                n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'scrap'
              "
              icon="fa-solid fa-scroll"
              class="textt-[#FFB800] text-[#ff9742] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="
                n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'todo'
              "
              icon="fa-regular fa-square-check"
              class="textt-[#FFB800] text-[#42ff48] text-[1.035rem] mr-2 mt-1"
            />
            
            <div class="max-h-none">
              <button class="w-full text-left max-h-none">
                <div
                  class="text-[1.035rem]"
                  v-if="n.name.replace(/^.*[\\/]/, '').match('untitled-')"
                >
                  New Note...
                </div>
                <div class="text-[1.035rem] break-all" v-else>
                  {{
                    n.name
                      .replace(/^.*[\\/]/, "")
                      .split(".")
                      .slice(0, -1)
                      .join(".")
                  }}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      </Transition>
      <Transition name="slide-fade">
      <div id="sidebar2" class="bg-[#1f1f1f] flex-grow h-screen max-h-screen" v-if="show == 2">
        
        <div
          class="bg-[#242424] duration-200 h-[54px] text-white flex px-4 select-none"
        >
          <!-- Left icons -->
          <button @click="show = 1" class="block">
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-[20px] opacity-90" />
          </button>

          <div
            class="flex flex-col justify-center ml-2.5 flex-grow mb-0.5"
          ></div>

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <button @click="this.NoteMenu = !this.NoteMenu">
              <img
                src="../assets/ellipsis.svg"
                class="w-[20px] h-[20px] opacity-90"
              />
            </button>
            <div
              v-if="NoteMenu"
              class="absolute bg-[#262626] z-50 min-w-44 right-4 rounded-lg top-10 py-3 shadow-md border border-[#5f5f5f]"
            >

            <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="copyImg()"
                v-if="opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'png' ||
                      opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'jpeg' ||
                      opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'jpg' ||
                      opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'webp'"
              >
                <font-awesome-icon
                  icon="fa-brands fa-markdown"
                  class="w-6 textt-[#FFB800] text-[#6289ff] text-[1.2rem] mr-1 mt-1 before"
                />
                {{t.copy_embed}}
              </div>
            
              <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="exportScrap()"
                v-if="opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'scrap'"
              >
                <font-awesome-icon
                  icon="fa-solid fa-download"
                  class="w-6 textt-[#FFB800] text-[#ffffff] text-[1.2rem] mr-1 mt-1 before"
                />
                {{t.export_scrap}}
              </div>

            <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="copyPath()"
              >
                <font-awesome-icon
                  icon="fa-solid fa-paperclip"
                  class="w-6 textt-[#FFB800] text-[#ffffffcc] text-[1.2rem] mr-1 mt-1 before"
                />
                {{t.copy_path}}
              </div>

              <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="deleteNote()"
              >
                <font-awesome-icon
                  icon="fa-solid fa-trash"
                  class="w-6 textt-[#FFB800] text-[#ff6262] text-[1.2rem] mr-1 mt-1 before"
                />
                {{ t.delete_note }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center h-[calc(100%-75px)] overflow-hidden">
          <!--<div class="w-full max-w-[44rem] mx-[2rem] mt-6 h-[calc(100%-24px)] border-none focus:outline-0 text-white">
            <div class="font-bold text-2xl mb-1.5 border-b pb-1 border-b-white text-white"><font-awesome-icon icon="fa-regular fa-file-lines" class="textt-[#FFB800] text-[#ffcd42] text-[1.24rem] mr-2 mt-1 before absolute -translate-x-6 translate-y-0.5" /><input type="text" value="Note Name" class="bg-transparent"></div>    
            <textarea id="my-text-area" class="bg-transparent w-full h-full" style="outline: none !important;"></textarea>
          </div>-->
          <div
            v-if="opened"
            id="editor-pane"
            class="w-full max-w-[35rem] mx-[2rem] mt-6 h-[calc(100%-24px)] border-none focus:outline-0 text-white"
            :class="
              ({
                'overflow-y-hidden':
                  opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] != 'md',
              },
              {
                'overflow-y-scroll':
                  opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'md',
              })
            "
          >
            <div
              class="font-bold mb-1.5 border-b pb-1 mr-2 border-b-white text-white"
            >
              <!--<font-awesome-icon icon="fa-regular fa-file-lines" class="textt-[#FFB800] text-[#ffcd42] text-[1.24rem] mr-2 mt-1 before absolute -translate-x-6 translate-y-0.5" />-->
              <input
                type="text"
                @change="changeNoteTitle"
                v-model="notetitle"
                style="outline: none !important; caret-color: white;"
                class="bg-transparent text-2xl flex-grow w-full"
                placeholder="Note Name"
              />
            </div>
            <textarea
              v-if="
                opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'txt'
              "
              v-model="textarea"
              placeholder="Type something..."
              v-on:input="save()"
              id="texteditor"
              class="bg-transparent w-full h-full"
              style="outline: none !important; caret-color: white"
            ></textarea>

            <div v-if="opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'png' ||
                       opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'webp' ||
                       opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'jpg' ||
                       opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'jpeg'"
                       class="h-full">
              <img :src="opening" />
            </div>

            <div v-if="opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'mp3' ||
                       opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'wav'"
                       class="h-full">
              <audio controls :src="opening" class="w-full"></audio>
            </div>

            <scrap
              v-if="
                opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'scrap'
              "
              :text="textarea"
              @save="saveScrap"
            />

            <todo
              v-if="
                opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'todo'
              "
              :text="textarea"
              @save="saveScrap"
            />

            <div
              v-html="mdContent"
              class="mdcontent"
              :class="{ hidden: mdParsed == true }"
            ></div>
            <div
              class="h-full"
              :class="{
                hidden:
                  mdParsed == false &&
                  opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'md',
              }"
            >
              <textarea
                v-model="textarea"
                placeholder="Type something..."
                v-on:input="save()"
                ref="editor"
                id="editor"
                class="bg-transparent w-full h-full"
                style="outline: none !important; caret-color: white"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      </Transition>
    </div>
  </div>

  <div
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-[#00000070] flex justify-center"
    v-if="createFolderForm"
  >
    <button
      class="fixed top-4 z-50 right-4"
      @click="this.createFolderForm = false"
    >
      <div
        class="w-9 h-9 text-center flex justify-center fles-col text-white bg-[#b93232] rounded-lg"
      >
        <div class="flex flex-col justify-center">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </button>
    <div class="flex flex-col justify-center">
      <div
        class="flex justify-center bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white"
      >
        <div class="text-center">
          <div class="text-2xl font-bold mb-3">{{ t.create_folder }}</div>
          <div class="text-md font-semibold pt-2 py-2.5">
            {{ t.folder_name }}
          </div>
          <input
            type="text"
            v-model="foldertitle"
            class="bg-[#262626] rounded-lg py-2 px-3 text-white text-center w-64"
            placeholder="Folder"
          />
          <div>
            <button
              class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
              @click="createFolder(foldertitle)"
            >
              {{ t.create }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="fixed top-0 left-0 w-screen z-10 h-screen bg-[#00000070] flex justify-center"
    v-if="createNotebookForm"
  >
    <button
      class="fixed top-4 z-50 right-4"
      @click="this.createNotebookForm = false"
    >
      <div
        class="w-9 h-9 text-center flex justify-center fles-col text-white bg-[#b93232] rounded-lg"
      >
        <div class="flex flex-col justify-center">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </button>
    <div class="flex flex-col justify-center">
      <div
        class="flex justify-center bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white"
      >
        <div class="text-center">
          <div class="text-2xl font-bold">{{ t.create_notebook }}</div>
          <div class="text-md font-semibold pt-4 py-2.5">
            {{ t.notebook_name }}
          </div>
          <input
            type="text"
            v-model="notebookname"
            class="bg-[#262626] rounded-lg py-2 px-3 text-white text-center w-64"
            placeholder="Notebook"
          />

          <div>
            <button
              class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
              @click="createNotebook()"
            >
              {{ t.create }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-[#00000070] flex justify-center"
    v-if="preferences"
  >
    <button class="fixed top-4 z-50 right-4" @click="this.preferences = false">
      <div
        class="w-9 h-9 text-left flex justify-center fles-col text-white bg-[#b93232] rounded-lg"
      >
        <div class="flex flex-col justify-center">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </button>
    <div class="flex flex-col justify-center">
      <div
        class="flex justify-left bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white"
      >
        <div class="text-center">
          <div class="text-xl font-bold mb-4">{{t.preferences}}</div>
          {{t.font}}
          <select v-model="font" @change="fontChange" class="bg-[#202020] text-white ml-3 rounded-lg p-3">
            <option value="">Default</option>
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../../node_modules/easymde/dist/easymde.min.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

.slide-fade-enter-active {
  transition: all 0.15s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}


/*--------*/

.slide-up-enter-active {
  transition: all 0.15s ease-out;
}

.slide-up-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(40px);
  opacity: 0;
}


/*----------*/
.CodeMirror-scroll{
  max-width: 39rem;
}

body {
  overflow: hidden;
}

.editor-toolbar {
  background-color: #262626;
  border: none;
  margin-bottom: 16px;
  margin-top: 12px;
  padding: 0px;
  border-radius: 9999px;
}

div.CodeMirror.cm-s-easymde.CodeMirror-wrap {
  background-color: #1f1f1f;
  color: white;
  border: none;
  padding: 0px;
}

.cm-header-1 {
  font-size: calc(1.325rem + 0.9vw) !important;
}

.cm-header-2 {
  font-size: calc(1.3rem + 0.6vw) !important;
}

.cm-strong:not(.cm-formatting) {
  text-decoration: underline; /* 下線 */
  text-decoration-thickness: 0.5em; /* 線の太さ */
  text-decoration-color: rgba(255, 228, 0, 0.4); /* 線の色 */
  text-underline-offset: -0.2em; /* 線の位置。テキストに重なるようにやや上部にする */
  text-decoration-skip-ink: none;
}

.cm-strong.cm-formatting {
  text-decoration: underline; /* 下線 */
  text-decoration-thickness: 0.5em; /* 線の太さ */
  text-decoration-color: rgba(255, 228, 0, 0.6); /* 線の色 */
  text-underline-offset: -0.2em; /* 線の位置。テキストに重なるようにやや上部にする */
  text-decoration-skip-ink: none;
}

.cm-formatting:not(.cm-quote) {
  opacity: 0.7;
}

.cm-quote {
  color: white !important;
  opacity: 0.9;
}

.CodeMirror-cursor {
  border-left: 1px solid #fff;
}

.cm-link{
  color: #84a4f0 !important;
}

/*----------*/

.mdcontent h1 {
  font-size: calc(1.325rem + 0.9vw);
  font-weight: bold;
}

.mdcontent h2 {
  font-size: calc(1.3rem + 0.6vw) !important;
  font-weight: bold;
}

.mdcontent h3 {
  font-size: calc(1.2rem + 0.3vw) !important;
  font-weight: bold;
}

.mdcontent h4 {
  font-size: calc(1.1rem + 0.2vw) !important;
  font-weight: bold;
}

.mdcontent h5 {
  font-size: calc(1.05rem + 0.1vw) !important;
  font-weight: bold;
}

.mdcontent h6 {
  font-size: calc(1rem) !important;
  font-weight: bold;
}

.mdcontent strong {
  text-decoration: underline; /* 下線 */
  text-decoration-thickness: 0.5em; /* 線の太さ */
  text-decoration-color: rgba(255, 230, 0, 0.5); /* 線の色 */
  text-underline-offset: -0.2em; /* 線の位置。テキストに重なるようにやや上部にする */
  text-decoration-skip-ink: none;
  font-weight: bold;
}

.mdcontent blockquote {
  border-left: 6px solid #ffffff50;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  margin: 6px;
}

.mdcontent a {
  color: #84a4f0;
  text-decoration: underline;
}

.mdcontent ul, ol{
  display: flex;
  flex-direction: column;
}

.mdcontent ul li{
  list-style: disc;
  list-style-position: inside;
}

.mdcontent ol li{
  list-style: decimal;
  list-style-position: inside;
}

/*-----------------------*/

@media(min-width: 1580px) {
  #editor-pane{
    max-width: 50rem;
  }
}
</style>

<script>
import scrap from "./Scrap.vue";
import todo from "./ToDo.vue";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { App } from '@capacitor/app';

export default {
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
      regex: "untitled-",
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
    Filesystem.readFile({
        path: `ideaNote/currentnotebook.txt`,
        directory: Directory.External,
        encoding: Encoding.UTF8,
      }).then((result) => {
        this.currentNotebook = result.data
        Filesystem.readdir({path: `ideaNote/${this.currentNotebook}/`, directory: Directory.External}).then((result) => {
          this.dirs = result.files.filter(item => item.type !== "file")
          this.openingDir = ""
        });
      })      

      


    let textarea_ = "";

    App.addListener('backButton', BackButtonListener => {
      if(this.show == 1){
        this.show = 0
      }
      if(this.show == 2){
        this.show = 1
      }
    })
  },
  methods: {
    deleteFolder(folder){
      window.electronAPI.deleteFolder(folder).then((result) => {
        location.reload();
      })
    },
    pinNote(){
      this.notetitle = this.notetitle + " #pin"
      this.changeNoteTitle()
    },
    unpinNote(){
      this.notetitle = this.notetitle.replace(" #pin", "")
      this.notetitle = this.notetitle.replace("#pin", "")
      this.changeNoteTitle()
    },
    openPreferences() {
      this.preferences = true;
    },
    copyPath(){
      var copyStr = this.opening.replace(this.currentNotebook, "{notebook}")
      copyStr = copyStr.replace(/\\/g, "/")
      navigator.clipboard.writeText(copyStr)
      this.NoteMenu = false
    },
    copyImg(){
      var copyStr = this.opening.replace(this.currentNotebook, "{notebook}")
      copyStr = copyStr.replace(/\\/g, "/")
      navigator.clipboard.writeText(`![](${copyStr})`)
      this.NoteMenu = false
    },
    sendFeedback() {
      this.sendFeedbackForm = false;
      axios
        .post(
          `https://app.formester.com/forms/ec2b098d-bc7e-4d23-974a-5862383ff006/submissions.json`,
          { content: this.feedback },
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
      this.show = 1
      Filesystem.readdir({path: `ideaNote/${this.currentNotebook}/`, directory: Directory.External}).then((result) => {
        this.notes = result.files.filter(item => item.type === "file");
        this.openingDir = "";
      });
    },
    changeNoteTitle() {
      if(this.openingDir == ""){
        this.openingDir = {"name": ""}
      }
      document.activeElement.blur()

     Filesystem.rename({
      from: `ideaNote/${this.currentNotebook}/${this.openingDir.name}/${this.opening}`,
      to:  `ideaNote/${this.currentNotebook}/${this.openingDir.name}/${this.notetitle + "." + this.ext}`,
      directory: Directory.External,
      toDirectory: Directory.External
     })
        .then((res) => {
          this.readNote(this.notetitle + "." + this.ext)
          if (this.openingDir == "") {
            Filesystem.readdir({path: `ideaNote/${this.openingDir.name}/${this.currentNotebook}/`, directory: Directory.External}).then((result) => {
        this.notes = result.files.filter(item => item.type === "file");;
        this.openingDir = "";
      });
          } else {
            Filesystem.readdir({path: `ideaNote/${this.currentNotebook}/${this.openingDir.name}/`, directory: Directory.External}).then((result) => {
        this.notes = result.files.filter(item => item.type === "file");;
      });
            }
        });
    },
    createNotebook() {
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
          location.reload();
        })

      })
    },
    newFolder() {
      this.createFolderForm = true;
    },
    createFolder(title) {
      Filesystem.mkdir({
        directory: Directory.External,
        path: `ideaNote/${this.currentNotebook}/${title}/`,
        recursive: true
      })
        .then((_result) => {
          this.createFolderForm = false;
          Filesystem.readdir({path: `ideaNote/${this.currentNotebook}/`, directory: Directory.External}).then((result) => {
          this.dirs = result.files.filter(item => item.type != "file");
          this.openingDir = "";
      });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    save() {
      console.log("Saving a note...");
      //window.electronAPI.saveNote(this.opening, this.textarea);
      if(this.openingDir == ""){
        this.openingDir = {"name": ""}
      }
      Filesystem.writeFile({
        path: `ideaNote/${this.currentNotebook}/${this.openingDir.name}/${this.opening}`,
        directory: Directory.External,
        data: this.textarea,
        encoding: Encoding.UTF8
      })
      //window.electronAPI.setCurrentNotebook(this.notebook);
    },
    saveScrap(data) {
      console.log("Saving a scrap...");
      if(this.openingDir == ""){
        this.openingDir = {"name": ""}
      }
      Filesystem.writeFile({
        path: `ideaNote/${this.currentNotebook}/${this.openingDir.name}/${this.opening}`,
        directory: Directory.External,
        data: data,
        encoding: Encoding.UTF8
      })
      //window.electronAPI.setCurrentNotebook(this.notebook);
    },
    readNote(notee, md = false) {
      this.show = 2
      this.opening = ""
      this.editor = ""
      this.textarea = ""
      const elements = document.querySelectorAll(".EasyMDEContainer");
      elements.forEach((element) => {
        element.remove();
      });

      this.opened = true;
      try {
        this.$refs.editor.style.display = "block";
      } catch {}

      if(this.openingDir == ""){
        this.openingDir = {"name": ""}
      }
      Filesystem.readFile({
        path: `ideaNote/${this.currentNotebook}/${this.openingDir.name}/${notee}`,
        directory: Directory.External,
        encoding: Encoding.UTF8
      })
        .then((result) => {
          this.ext = notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0];
          if (
            (this.notetitle = notee
              .replace(/^.*[\\/]/, "")
              .match("untitled-"))
          ) {
            this.notetitle = "";
          } else {
            this.notetitle = notee.replace(/^.*[\\/]/, "");
            this.notetitle = this.notetitle.split(".").slice(0, -1).join(".");
          }

          if (notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "png" &&
              notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "jpeg" &&
              notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "jpg" &&
              notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "webp" &&
              notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "mp3" &&
              notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "wav"){
            this.textarea = result.data;
          }
          this.opening = notee;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openDir(dir) {
      this.openingDir = dir;
      this.show = 1

      Filesystem.readdir({path: `ideaNote/${this.currentNotebook}/${this.openingDir.name}/`, directory: Directory.External}).then((result) => {
        this.notes = result.files.filter(item => item.type === "file");
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
      Filesystem.writeFile({
            path: `ideaNote/currentnotebook.txt`,
            data: n.name,
            directory: Directory.External,
            encoding: Encoding.UTF8,
            recursive: true
          })
      location.reload();
    },
    openNotebookMenu() {
      if (this.NotebookMenu) {
        this.NotebookMenu = false;
      } else {
        Filesystem.readdir({
          path: `ideaNote/`,
          directory: Directory.External
        }).then((result) => {
          this.notebooks = result.files.filter(item => item.type !== "file");
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
      let noteName = `untitled-${Math.random()
        .toString(36)
        .slice(-8)}.${filetype}`;
      console.log(
        "Creating note to " +
        `ideaNote/${this.currentNotebook}/${this.openingDir.name}/${noteName}`,
      );

      this.opening = noteName;

      //window.electronAPI.createNote(this.currentNotebook+"\\"+(this.openingDir+"\\")+noteName, "")
      if(this.openingDir == ""){
        this.openingDir = {"name": ""}
      }
      Filesystem.writeFile({
        path: `ideaNote/${this.currentNotebook}/${this.openingDir.name}/${noteName}`,
        directory: Directory.External,
        data: ""
      }).then((result) => {
          this.notetitle = "";
          this.textarea = "";
          this.opening =
            this.currentNotebook + "\\" + this.openingDir.name + "\\" + noteName;
          
          this.readNote(`${noteName}`)
        });
      if (this.openingDir == "") {
        Filesystem.readdir({path: `ideaNote/${this.currentNotebook}/`, directory: Directory.External}).then((result) => {
        this.notes = result.files.filter(item => item.type === "file");;
        this.openingDir = "";
      });
      } else {
        Filesystem.readdir({path: `ideaNote/${this.currentNotebook}/${this.openingDir.name}/`, directory: Directory.External}).then((result) => {
        this.notes = result.files.filter(item => item.type === "file");;
      });
      }

      this.newNoteMenu = false;
    },
    deleteNote() {
      if(this.openingDir == ""){
        this.openingDir = {"name": ""}
      }
      Filesystem.deleteFile({
        directory: Directory.External,
        path: `ideaNote/${this.currentNotebook}/${this.openingDir.name}/${this.opening}`
      }).then((_result) => {
        this.NoteMenu = false;
        this.notetitle = "";
        this.opening = this.currentNotebook;

        if (this.openingDir.name == "") {
          this.selectRoot()
        } else {
          this.openDir(this.openingDir.name)
        }
      });
    },
    createScrap() {
      let noteName = `untitled-${Math.random().toString(36).slice(-8)}`;
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
};
</script>
