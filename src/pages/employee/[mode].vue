<script setup lang="ts">
import { messages, type Message } from './messages';

const router = useRouter();
const route = useRoute();
const { mode } = route.params;

const { search } = useZip();

const title = mode === 'create' ? '社員登録' : '社員詳細';

const { data: postList } = await useFetch('/api/general-code/post');

const formEmployee = reactive({
  employeeCd: '',
  employeeName: '',
  kana: '',
  email: '',
  password: '',
  tel: '',
  departmentCd: '',
  post: '',
  authority: '0',
  employmentStatus: '0',
  incumbencyStatus: '0',
  loginAt: '',
  failureCount: 0,
  lockedAt: '',
  created_employee: '',
  created_at: '',
  updated_employee: '',
  updated_at: '',
});

const formPersonal = reactive({
  gender: '0',
  birthday: '',
  zipCode: '',
  prefecture: '',
  address: '',
  building: '',
  email: '',
  tel: '',
  emergencyTel: '',
  entryDate: '',
  retirementDate: '',
  retirementStatus: '',
});

const departmentName = ref('');

const tabList = ref([
  { id: 'tab1', name: '基本情報' },
  { id: 'tab2', name: '個人情報' },
  { id: 'tab3', name: 'その他' },
]);
const pickedTabId = ref('tab1');

const authorityList = [
  { id: '0', name: '一般' },
  { id: '1', name: '中級' },
  { id: '2', name: '上級' },
  { id: '3', name: '人事' },
  { id: '99', name: '管理者' },
];

const incumbencyList = [
  { id: '0', name: '在職中' },
  { id: '1', name: '退職' },
];

const genderList = [
  { id: '0', name: '男性' },
  { id: '1', name: '女性' },
];

const showMessages = ref<string[]>([]);

/**
 * 更新可能者
 *   2: 登録モード時、権限が「3：人事」、「99：管理者」
 *   1: ログイン社員 = 詳細の社員コード
 *   0: その他
 */
const permitLv = computed((): number => {
  if (mode === 'create') {
    return 2;
  }

  const loginInfo = useLoginInfo();

  if (loginInfo.value.authority === 3 || loginInfo.value.authority === 99) {
    return 2;
  }

  if (loginInfo.value.employeeId === mode) {
    return 1;
  }

  tabList.value.splice(1, 1);

  return 0;
});

const searchZip = async () => {
  const zipInfo = await search(formPersonal.zipCode);

  if (!zipInfo) {
    formPersonal.prefecture = '';
    formPersonal.address = '';
    return;
  }

  const info = zipInfo.results[0];

  formPersonal.prefecture = info.address1;
  formPersonal.address = info.address2 + info.address3;
};

const onClear = () => {
  // 基本情報
  formEmployee.employeeCd = '';
  formEmployee.employeeName = '';
  formEmployee.kana = '';
  formEmployee.email = '';
  formEmployee.password = '';
  formEmployee.tel = '';
  formEmployee.departmentCd = '';
  formEmployee.post = '';
  formEmployee.authority = '0';
  formEmployee.employmentStatus = '0';
  formEmployee.incumbencyStatus = '0';
  formEmployee.loginAt = '';
  formEmployee.failureCount = 0;
  formEmployee.lockedAt = '';

  // 個人情報
  formPersonal.gender = '0';
  formPersonal.birthday = '';
  formPersonal.zipCode = '';
  formPersonal.prefecture = '';
  formPersonal.address = '';
  formPersonal.building = '';
  formPersonal.email = '';
  formPersonal.tel = '';
  formPersonal.emergencyTel = '';
  formPersonal.entryDate = '';
  formPersonal.retirementDate = '';
  formPersonal.retirementStatus = '';

  departmentName.value = '';
};

const onCreate = (): void => {
  showMessages.value = [];
  // check
  if (!formEmployee.employeeCd) showMessages.value.push(messages.required.employeeCd);
  if (!formEmployee.employeeName) showMessages.value.push(messages.required.employeeName);
  if (!formEmployee.kana) showMessages.value.push(messages.required.kana);
  if (!formEmployee.password) showMessages.value.push(messages.required.password);
};
</script>

<template>
  <H1Title>{{ title }}</H1Title>
  <form class="box_create" autocomplete="none">
    <TabNavi :list="tabList" v-model:pickedId="pickedTabId" />
    <div class="content" v-show="pickedTabId === 'tab1'">
      <div class="item">
        <LabelItem required>社員コード</LabelItem>
        <InputText size="m" v-model="formEmployee.employeeCd" :disabled="permitLv < 2" />
      </div>
      <div class="item">
        <LabelItem required>社員名</LabelItem>
        <InputText size="xl" v-model="formEmployee.employeeName" :disabled="permitLv < 1" />
      </div>
      <div class="item">
        <LabelItem required>ふりがな</LabelItem>
        <InputText size="xl" v-model="formEmployee.kana" :disabled="permitLv < 1" />
      </div>
      <div class="item">
        <LabelItem required>メールアドレス</LabelItem>
        <InputText size="xl" v-model="formEmployee.email" :disabled="permitLv < 1" />
      </div>
      <div class="item">
        <LabelItem required>パスワード</LabelItem>
        <InputText type="password" size="xl" v-model="formEmployee.password" :disabled="permitLv < 1" />
      </div>
      <div class="item">
        <LabelItem>連絡先</LabelItem>
        <InputText size="xl" v-model="formEmployee.tel" :disabled="permitLv < 1" />
      </div>
      <div class="item">
        <LabelItem>所属部門コード</LabelItem>
        <InputText size="m" v-model="formEmployee.departmentCd" :disabled="permitLv < 2" />
        <IconSearch />
        <span class="name_space">
          {{ departmentName }}
        </span>
      </div>
      <div class="item">
        <LabelItem>役職</LabelItem>
        <select v-model="formEmployee.post" :disabled="permitLv < 1">
          <option value="0">正社員</option>
          <option value="1">契約社員</option>
          <option value="2">嘱託社員</option>
          <option value="3">派遣社員</option>
          <option value="4">出向社員</option>
          <option value="5">準社員</option>
          <option value="6">パート</option>
          <option value="7">アルバイト</option>
          <option value="8">BP</option>
        </select>
      </div>
      <div class="item">
        <LabelItem>権限</LabelItem>
        <RadioList
          :list="authorityList"
          id-prefix="auth_"
          v-model:pickedId="formEmployee.authority"
          :disabled="permitLv < 2"
        />
      </div>
      <div class="item">
        <LabelItem>雇用形態</LabelItem>
        <select v-model="formEmployee.employmentStatus" :class="{ g_disabled: permitLv < 2 }" :disabled="permitLv < 2">
          <option value="0">正社員</option>
          <option value="1">契約社員</option>
          <option value="2">嘱託社員</option>
          <option value="3">派遣社員</option>
          <option value="4">出向社員</option>
          <option value="5">準社員</option>
          <option value="6">パート</option>
          <option value="7">アルバイト</option>
          <option value="8">BP</option>
        </select>
      </div>
      <div class="item">
        <LabelItem>在職区分</LabelItem>
        <RadioList
          :list="incumbencyList"
          id-prefix="incumbency_"
          v-model:pickedId="formEmployee.incumbencyStatus"
          :disabled="permitLv < 2"
        />
      </div>
    </div>
    <template v-if="permitLv >= 1">
      <div class="content" v-show="pickedTabId === 'tab2'">
        <div class="item">
          <LabelItem>性別</LabelItem>
          <RadioList
            :list="genderList"
            id-prefix="gender_"
            v-model:pickedId="formPersonal.gender"
            :disabled="permitLv < 1"
          />
        </div>
        <div class="item">
          <LabelItem>生年月日</LabelItem>
          <InputText type="date" size="m" v-model="formPersonal.birthday" :disabled="permitLv < 1" />
        </div>
        <div class="item">
          <LabelItem>郵便番号</LabelItem>
          <InputText size="s" @on-blur="searchZip" v-model="formPersonal.zipCode" :disabled="permitLv < 1" />
        </div>
        <div class="item">
          <LabelItem>都道府県</LabelItem>
          <select v-model="formPersonal.prefecture" :class="{ g_disabled: permitLv < 1 }" :disabled="permitLv < 1">
            <optgroup label="北海道・東北">
              <option value="北海道">北海道</option>
              <option value="青森県">青森県</option>
              <option value="岩手県">岩手県</option>
              <option value="宮城県">宮城県</option>
              <option value="秋田県">秋田県</option>
              <option value="山形県">山形県</option>
              <option value="福島県">福島県</option>
            </optgroup>
            <optgroup label="関東">
              <option value="茨城県">茨城県</option>
              <option value="栃木県">栃木県</option>
              <option value="群馬県">群馬県</option>
              <option value="埼玉県">埼玉県</option>
              <option value="千葉県">千葉県</option>
              <option value="東京都">東京都</option>
              <option value="神奈川県">神奈川県</option>
            </optgroup>
            <optgroup label="中部">
              <option value="新潟県">新潟県</option>
              <option value="富山県">富山県</option>
              <option value="石川県">石川県</option>
              <option value="福井県">福井県</option>
              <option value="山梨県">山梨県</option>
              <option value="長野県">長野県</option>
              <option value="岐阜県">岐阜県</option>
              <option value="静岡県">静岡県</option>
              <option value="愛知県">愛知県</option>
            </optgroup>
            <optgroup label="近畿">
              <option value="三重県">三重県</option>
              <option value="滋賀県">滋賀県</option>
              <option value="京都府">京都府</option>
              <option value="大阪府">大阪府</option>
              <option value="兵庫県">兵庫県</option>
              <option value="奈良県">奈良県</option>
              <option value="和歌山県">和歌山県</option>
            </optgroup>
            <optgroup label="中国">
              <option value="鳥取県">鳥取県</option>
              <option value="島根県">島根県</option>
              <option value="岡山県">岡山県</option>
              <option value="広島県">広島県</option>
              <option value="山口県">山口県</option>
            </optgroup>
            <optgroup label="四国">
              <option value="徳島県">徳島県</option>
              <option value="香川県">香川県</option>
              <option value="愛媛県">愛媛県</option>
              <option value="高知県">高知県</option>
            </optgroup>
            <optgroup label="九州・沖縄">
              <option value="福岡県">福岡県</option>
              <option value="佐賀県">佐賀県</option>
              <option value="長崎県">長崎県</option>
              <option value="熊本県">熊本県</option>
              <option value="大分県">大分県</option>
              <option value="宮崎県">宮崎県</option>
              <option value="鹿児島県">鹿児島県</option>
              <option value="沖縄県">沖縄県</option>
            </optgroup>
          </select>
        </div>
        <div class="item">
          <LabelItem>住所</LabelItem>
          <InputText size="xl" v-model="formPersonal.address" :disabled="permitLv < 1" />
        </div>
        <div class="item">
          <LabelItem>建物</LabelItem>
          <InputText size="xl" v-model="formPersonal.building" :disabled="permitLv < 1" />
        </div>
        <div class="item">
          <LabelItem>メールアドレス</LabelItem>
          <InputText size="xl" v-model="formPersonal.email" :disabled="permitLv < 1" />
        </div>
        <div class="item">
          <LabelItem>連絡先</LabelItem>
          <InputText size="xl" v-model="formPersonal.tel" :disabled="permitLv < 1" />
        </div>
        <div class="item">
          <LabelItem>入社日</LabelItem>
          <InputText type="date" size="m" v-model="formPersonal.entryDate" :disabled="permitLv < 2" />
        </div>
        <div class="item">
          <LabelItem>退職日</LabelItem>
          <InputText type="date" size="m" v-model="formPersonal.retirementDate" :disabled="permitLv < 2" />
        </div>
        <div class="item">
          <LabelItem>退職区分</LabelItem>
          <select
            v-model="formPersonal.retirementStatus"
            :class="{ g_disabled: permitLv < 2 }"
            :disabled="permitLv < 2"
          >
            <option value="0">自己都合</option>
            <option value="1">契約期間満了</option>
            <option value="2">定年</option>
            <option value="3">早期</option>
            <option value="4">解雇</option>
            <option value="5">会社都合</option>
            <option value="6">その他</option>
          </select>
        </div>
      </div>
    </template>
    <div class="content" v-show="pickedTabId === 'tab3'">
      <div class="item">
        <LabelItem>ログイン日時</LabelItem>
        <InputText
          type="datetime-local"
          size="l"
          v-model="formEmployee.loginAt"
          :disabled="mode === 'create' || permitLv < 2"
        />
      </div>
      <div class="item">
        <LabelItem>ログイン失敗回数</LabelItem>
        <InputText
          type="number"
          size="xs"
          :min="0"
          v-model="formEmployee.failureCount"
          :disabled="mode === 'create' || permitLv < 2"
        />
      </div>
      <div class="item">
        <LabelItem>ロック日時</LabelItem>
        <InputText
          type="datetime-local"
          size="l"
          v-model="formEmployee.lockedAt"
          :disabled="mode === 'create' || permitLv < 2"
        />
      </div>
      <div class="item">
        <LabelItem>作成者</LabelItem>
        <InputText size="xl" v-model="formEmployee.created_employee" :disabled="true" />
      </div>
      <div class="item">
        <LabelItem>作成日</LabelItem>
        <InputText type="datetime-local" size="l" v-model="formEmployee.created_at" :disabled="true" />
      </div>
      <div class="item">
        <LabelItem>更新者</LabelItem>
        <InputText size="xl" v-model="formEmployee.updated_employee" :disabled="true" />
      </div>
      <div class="item">
        <LabelItem>更新日</LabelItem>
        <InputText type="datetime-local" size="l" v-model="formEmployee.updated_at" :disabled="true" />
      </div>
    </div>
    <Transition>
      <div class="error_message" v-if="showMessages.length !== 0">
        <ul>
          <li v-for="(message, index) in showMessages" :key="index">{{ message }}</li>
        </ul>
      </div>
    </Transition>
    <div class="buttons">
      <ButtonCreate @on-create="onCreate" />
      <ButtonClear @on-clear="onClear" />
      <ButtonBack @on-back="router.push('/employee/list')" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.box_create {
  padding-top: 8px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: #fff;
  border: 1px solid #e6e9ed;
}

.item {
  display: flex;
  gap: 16px;
  align-items: center;
  height: 36px;
}

.icon_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.name_space {
  margin-top: 3px;
  margin-left: 8px;
}

.error_message {
  padding: 8px;
  margin-top: 8px;
  font-size: 12px;
  color: #fa2e2e;
  background-color: #ffd9d9;
  border: 2px solid #fb6565;
  border-right-width: 6px;
  border-left-width: 6px;
  border-radius: 4px;

  li {
    padding: 3px 0;
    margin-left: 16px;
    list-style-type: disc;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.buttons {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  margin-left: 16px;

  button:first-child {
    margin-right: 40px;
  }
}
</style>
