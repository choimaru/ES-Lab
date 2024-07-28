import type { UnwrapRef } from 'vue';

type SortOrder = 'asc' | 'desc';
type SortKey<T> = keyof T;

export const useSortTable = <T>(
  tableData: T[],
  initSortKey: SortKey<T>,
  initSortOrder: SortOrder = 'asc'
) => {
  const sortTableData = ref([...tableData]);
  const sortKey = ref(initSortKey);
  const sortOrder = ref(initSortOrder);

  const sort = (key: UnwrapRef<SortKey<T>>) => {
    if (sortKey.value === key) {
      // 同じキーが再クリックされた場合、ソート順序を反転
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      // 別のキーがクリックされた場合、新しいキーで昇順ソート
      sortKey.value = key;
      sortOrder.value = 'asc';
    }

    // ソートクラスの更新
    const thElements = document.querySelectorAll('.sort_indicator');
    thElements.forEach((el) => {
      el.classList.remove('asc', 'desc');
    });

    // 対象thにクラスを付与
    const targetTh = document.getElementById(key as string);
    if (targetTh) {
      targetTh.classList.add(sortOrder.value);
    }

    // ソート
    sortTableData.value.sort((_a, _b) => {
      const a = _a[sortKey.value as keyof typeof _a];
      const b = _b[sortKey.value as keyof typeof _b];

      if (typeof a === 'number' && typeof b === 'number') {
        return sortOrder.value === 'asc' ? a - b : b - a;
      } else if (typeof a === 'string' && typeof b === 'string') {
        return sortOrder.value === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
      } else {
        // 型が一致しない場合は同じとみなす
        return 0;
      }
    });
  };

  return {
    sort,
    sortTableData,
  };
};
