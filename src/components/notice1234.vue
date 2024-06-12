<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue & Tailwind Design</title>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="app">
      <div class="flex flex-col pt-6 bg-white">
        <header
          class="flex gap-5 justify-between self-center w-full max-w-[1308px] max-md:flex-wrap max-md:max-w-full"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/450bce069b465b53e07b8bf3d785e9051308371a7b4847903422b615acfbc73a?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
            alt="Image 1"
            class="shrink-0 max-w-full aspect-[3.03] w-[187px]"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/28a92f9b038a33e72ad112cda7b19386aeb5c3a38865905e586688b9a0466295?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
            alt="Image 2"
            class="shrink-0 self-start mt-2 max-w-full aspect-[2.22] w-[117px]"
          />
        </header>
        <section
          class="justify-center items-start py-7 pr-16 pl-20 mt-5 w-full text-xl font-bold text-blue-500 border border-solid border-zinc-300 max-md:pr-5 max-md:pl-8 max-md:max-w-full"
        >
          나의 SEL 알기
        </section>
        <main
          class="flex flex-col items-center px-20 mt-11 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
        >
          <h1
            class="self-stretch text-xl font-bold text-blue-500 max-md:max-w-full"
          >
            마음알기 설문1
          </h1>
          <section
            class="flex gap-5 self-stretch mt-5 max-md:flex-wrap max-md:max-w-full"
          >
            <h2 class="flex-auto text-2xl font-bold text-neutral-700">
              나의 SEL 알기
            </h2>
            <time
              class="flex-auto self-start text-base font-medium leading-8 text-black"
            >
              기간 : YYYY년 MM월 DD일 ~ MM월 DD일
            </time>
          </section>
          <div
            class="flex gap-4 mt-6 ml-36 text-base font-medium text-neutral-700"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9dd9fe252463f59eab715c00458d8a8e4bbf55a919cb8668ea06ace79c0142d?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
              alt="Image 3"
              class="shrink-0 max-w-full aspect-[0.99] w-[127px]"
            />
            <div
              class="flex overflow-hidden relative flex-col gap-2.5 px-9 py-6 my-auto border border-solid aspect-[2.59] border-neutral-300 fill-white stroke-[1px] stroke-neutral-300 max-md:px-5"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5dc5512d2a93088a0a29e4d91010c45c3ab1f4f445c234bc2e9a3728237662dd?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
                alt=""
                class="object-cover absolute inset-0 size-full"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/288e9610cd60c9235ff4925a093a406a432933347bf48e9106aa8d73a8b7c6c4?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
                alt="decorative icon"
                class="shrink-0 self-start aspect-square w-[18px]"
              />
              <p class="relative">1개의 답안을 선택해<br />주세요.</p>
            </div>
          </div>
          <section
            class="flex gap-5 justify-between mt-12 max-w-full w-[690px] max-md:flex-wrap max-md:mt-10"
          >
            <div class="flex flex-col">
              <div
                class="flex flex-col justify-center p-2 rounded-3xl border border-blue-400 border-solid"
              >
                <div class="shrink-0 w-8 h-8 bg-blue-400 rounded-2xl"></div>
              </div>
              <div class="self-center mt-4 text-base text-center text-black">
                1
              </div>
            </div>
            <div
              class="flex flex-col px-2 pt-2 text-base text-center text-black whitespace-nowrap"
            >
              <div class="shrink-0 w-8 h-8 rounded-2xl bg-neutral-200"></div>
              <div class="mt-6">2</div>
            </div>
            <div
              class="flex flex-col px-2 pt-2 text-base text-center text-black whitespace-nowrap"
            >
              <div class="shrink-0 w-8 h-8 rounded-2xl bg-neutral-200"></div>
              <div class="mt-6">3</div>
            </div>
            <div
              class="flex flex-col px-2 pt-2 text-base text-center text-black whitespace-nowrap"
            >
              <div class="shrink-0 w-8 h-8 rounded-2xl bg-neutral-200"></div>
              <div class="mt-6">4</div>
            </div>
            <div
              class="flex flex-col px-2 pt-2 text-base text-center text-black whitespace-nowrap"
            >
              <div class="shrink-0 w-8 h-8 rounded-2xl bg-neutral-200"></div>
              <div class="mt-6">5</div>
            </div>
            <div
              class="flex flex-col px-2 pt-2 text-base text-center text-black whitespace-nowrap"
            >
              <div class="shrink-0 w-8 h-8 rounded-2xl bg-neutral-200"></div>
              <div class="mt-6">6</div>
            </div>
          </section>
          <p
            class="self-start mt-4 ml-3.5 text-base font-medium leading-6 text-neutral-700 max-md:ml-2.5"
          >
            자동저장되어 이어서 진행할 수 있습니다.
          </p>
          <nav
            class="flex gap-0 mt-4 w-full text-base font-bold text-cyan-900 max-w-[1255px] max-md:flex-wrap max-md:max-w-full"
          >
            <div class="justify-center p-2.5 whitespace-nowrap bg-indigo-50">
              순번
            </div>
            <div
              class="justify-center items-center p-2.5 bg-indigo-50 max-md:px-5 max-md:max-w-full"
            >
              <span class="text-red-600">*</span>는 필수 응답 문항입니다.
            </div>
            <div class="justify-center p-2.5 text-center bg-blue-100">
              절대로<br />바꿀 수 없어요
            </div>
            <div class="justify-center p-2.5 text-center bg-blue-100">
              약간<br />바꿀 수 있어요
            </div>
            <div class="justify-center p-2.5 text-center bg-blue-100">
              어느 정도<br />바꿀 수 있어요
            </div>
            <div class="justify-center p-2.5 text-center bg-blue-100">
              대체로<br />바꿀 수 있어요
            </div>
            <div class="justify-center p-2.5 text-center bg-blue-100">
              완전히<br />바꿀 수 있어요
            </div>
          </nav>
          <section
            class="px-7 py-7 max-w-full border-b border-solid border-stone-200 w-[1255px] max-md:px-5"
          >
            <form class="flex gap-5 max-md:flex-col max-md:gap-0">
              <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div
                  class="flex grow gap-5 justify-between text-base font-medium max-md:flex-wrap max-md:mt-10"
                >
                  <label
                    class="my-auto leading-[150%] text-neutral-700"
                    for="question1"
                    >1</label
                  >
                  <label class="leading-6 text-red-600" for="question1"
                    >학교에서 단짝친구 외에 다른 친구와<br />활동이나 놀이를
                    해보도록<br />바꿀 수 있나요?
                    <span class="text-red-600">*</span></label
                  >
                </div>
                <input
                  type="text"
                  id="question1"
                  name="question1"
                  class="sr-only"
                />
              </div>
              <div class="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div
                  class="flex gap-5 justify-between self-stretch my-auto max-md:flex-wrap max-md:mt-10 max-md:max-w-full"
                >
                  <label
                    class="flex flex-col justify-center p-1.5 border border-solid border-neutral-400 rounded-[999px]"
                    tabindex="0"
                  >
                    <div
                      class="shrink-0 w-3 h-3 bg-blue-400 rounded-[999px]"
                    ></div>
                    <input
                      type="radio"
                      name="answer1"
                      value="1"
                      class="sr-only"
                    />
                  </label>
                  <label
                    class="shrink-0 p-1.5 w-6 h-6 border border-solid border-neutral-400 rounded-[999px]"
                    tabindex="0"
                  >
                    <input
                      type="radio"
                      name="answer1"
                      value="2"
                      class="sr-only"
                    />
                  </label>
                  <label
                    class="shrink-0 p-1.5 w-6 h-6 border border-solid border-neutral-400 rounded-[999px]"
                    tabindex="0"
                  >
                    <input
                      type="radio"
                      name="answer1"
                      value="3"
                      class="sr-only"
                    />
                  </label>
                  <label
                    class="shrink-0 p-1.5 w-6 h-6 border border-solid border-neutral-400 rounded-[999px]"
                    tabindex="0"
                  >
                    <input
                      type="radio"
                      name="answer1"
                      value="4"
                      class="sr-only"
                    />
                  </label>
                  <label
                    class="shrink-0 p-1.5 w-6 h-6 border border-solid border-neutral-400 rounded-[999px]"
                    tabindex="0"
                  >
                    <input
                      type="radio"
                      name="answer1"
                      value="5"
                      class="sr-only"
                    />
                  </label>
                </div>
              </div>
            </form>
          </section>
          <section
            class="flex gap-5 justify-between mt-72 w-full text-base text-center text-white whitespace-nowrap max-w-[1252px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full"
          >
            <button class="my-auto">임시저장</button>
            <div class="flex gap-5 justify-between">
              <button
                class="justify-center px-10 py-3 rounded-3xl bg-neutral-400 max-md:px-5"
              >
                이전
              </button>
              <button
                class="justify-center px-11 py-3 bg-blue-500 rounded-3xl max-md:px-5"
              >
                다음
              </button>
            </div>
          </section>
        </main>
        <footer
          class="flex flex-col justify-center mt-11 w-full text-base text-white bg-zinc-500 max-md:mt-10 max-md:max-w-full"
        >
          <section
            class="flex flex-col px-20 py-9 w-full bg-sky-800 border-t border-solid border-zinc-100 max-md:px-5 max-md:max-w-full"
          >
            <div class="max-md:max-w-full">개인정보처리방침</div>
            <div class="flex gap-5 mt-2 max-md:flex-wrap max-md:max-w-full">
              <address class="flex-auto my-auto max-md:max-w-full not-italic">
                세종특별자치시 남세종로 446 스마트허브4차 504호 TEL :
                044-715-7915 FAX : 070-4324-7900<br />COPYRIGHT© DATAEUM 2024.
                ALL RIGHT RESERVED.
              </address>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b074e6d1d6f1442ba6ee20df7127cdae2e22e86c3f1cf2dae3e1ed7755e9bad?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
                alt="Company logo"
                class="shrink-0 max-w-full aspect-[3.57] w-[164px]"
              />
            </div>
          </section>
        </footer>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <script>
      new Vue({
        el: '#app',
      });
    </script>
  </body>
</html>
