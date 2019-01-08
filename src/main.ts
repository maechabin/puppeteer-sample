import * as puppeteer from 'puppeteer';

(async () => {
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

  /** 2秒間待機 */
  await page.waitFor(2000);

  /** ボタンをクリックする */
  await page.click('input[name=btnK]');

  /** Webページのスクリーンショットを撮る */
  await page.screenshot({ path: './screenshot/example2.png' });

  /** 手動でブラウザを終了する */
  await browser.close();
})();
