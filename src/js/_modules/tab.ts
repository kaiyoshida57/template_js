/**
 * タブ切り替え関数
 * @param { String } listId - ラッパーID
 * ex: tab('tab');
 */

export function tab(listId: string): void {
  const element = document.getElementById(listId);
  const tabList = element?.querySelector('[role="tablist"]');
  const tabButtonList = element?.querySelectorAll('[role="tab"]');
	// tabボタンをそれぞれ配列として分割
  const tabArrayList = [].slice.call(tabButtonList);

  // tabFocusを初期化
  const activeTab = element?.querySelector('[aria-selected="true"]') as HTMLButtonElement;
	// 配列をタグで検索、index数値が返る
  const indexNum = (tabArrayList as HTMLButtonElement[]).indexOf(activeTab);
  let tabFocus = indexNum || 0;

  // Toggle function
  const toggleTab = (event: Event): void => {
    const eventTarget = event.currentTarget as HTMLButtonElement;
    const targetPanel = eventTarget.getAttribute('aria-controls');
    const activeTab = element?.querySelector('[aria-selected="true"]');
    const activeContent = element?.querySelector('[aria-hidden="false"]');

    // タブのaria-selected付け替え
		// 一度無効の属性与える
    activeTab?.setAttribute('aria-selected', 'false');
    activeTab?.setAttribute('tabindex', '-1');
		// event要素には有効の属性与える
    eventTarget?.setAttribute('aria-selected', 'true');
    eventTarget?.setAttribute('tabindex', '0');
    const indexNum = (tabArrayList as HTMLButtonElement[]).indexOf(eventTarget);
    tabFocus = indexNum;

    // コンテントのaria-hidden付け替え
    activeContent?.setAttribute('aria-hidden', 'true');
		// aria-controls(ID)で連動するパネルIDを取得
    element?.querySelector(`#${targetPanel || 'not-supplied'}`)?.setAttribute('aria-hidden', 'false');
    event.preventDefault();
  };

  // Tab click EventListener
  tabButtonList?.forEach((item) => {
    item.addEventListener('click', toggleTab);
  });

  // Keydown function
  const keydownFocus = (event: KeyboardEventInit) => {
    // キーの矢印の方向を検知する
    if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
      // Reset tabindex
      tabButtonList && tabButtonList[tabFocus].setAttribute('tabindex', '-1');
      // Move Right
      if (tabButtonList && event.code === 'ArrowRight') {
        tabFocus += 1;
        // 要素の最後を上回るフォーカスなら最初に戻る
        if (tabFocus >= tabButtonList.length) {
          tabFocus = 0;
        }
      } else if (tabButtonList && event.code === 'ArrowLeft') {
        tabFocus -= 1;
        // 要素の最初を下回るフォーカスなら最後に進む
        if (tabFocus < 0) {
          tabFocus = tabButtonList.length - 1;
        }
      }
      // tabindexの変更。0付与し正しい順序にtab移動させる
      const tabFocused = tabButtonList && (tabButtonList[tabFocus] as HTMLButtonElement);
      tabFocused && tabFocused.setAttribute('tabindex', '0');
      tabFocused && tabFocused.focus();
    }
  };

  // Tab keydown EventListener
  tabList?.addEventListener('keydown', keydownFocus);
}
