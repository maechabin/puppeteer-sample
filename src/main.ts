import * as puppeteer from 'puppeteer';

(async () => {
  /** 自動操作したいページのURL */
  const TARGET_URL = 'https://www.google.co.jp';

  /** puppeteerを起動 */
  const browser = await puppeteer.launch({
    headless: false, // Headlessモードで起動するかどうか
    slowMo: 50, // 50ミリ秒スローモーションで実行する
  });

  /** 新しい空のページを開く */
  const page = await browser.newPage();

  /** view portの設定 */
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  /** Webページにアクセスする */
  await page.goto(TARGET_URL);

  /** フォームにテキストを入力する */
  await page.type('input[name=q]', 'Puppeteer');

  /** Webページのスクリーンショットを撮る */
  await page.screenshot({ path: './screenshot/example.png' });

  /** フォーカスを検索ボタンに移動 */
  await page.focus('input[name=btnK]');

  /** ボタンをクリックする */
  await page.click('input[name=btnK]');

  /** 2秒間待機 */
  await page.waitFor(3000);

  /** Webページのスクリーンショットを撮る */
  await page.screenshot({ path: './screenshot/example2.png', fullPage: true });

  /** スクレイピング */
  const text = await page.evaluate(
    (): (string | null)[] => {
      const results: (string | null)[] = [];
      const elems = document.querySelectorAll('.LC20lb');
      if (elems !== null && elems.length > 0) {
        elems.forEach(
          (elem: Element): void => {
            results.push(elem.textContent);
          },
        );
      }
      return results;
    },
  );

  /**
   * 指定のリンクをクリック
   * selectorをちゃんと指定しないと
   * Error: No node found for selector: .r:nth-child(2) a のようなエラーが出る
   */
  await page.click(
    '#rso > div > div > div:nth-child(2) > div > div > div.r > a',
  );

  /** Webページのスクリーンショットを撮る */
  await page.screenshot({
    path: './screenshot/example3.png',
    fullPage: false,
  });

  /** 手動でブラウザを終了する */
  await browser.close();
})();
