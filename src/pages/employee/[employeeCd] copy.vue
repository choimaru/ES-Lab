<script setup lang="ts">
import type { Employees, PersonalDatas } from '~/server/db/drizzle/type';
import { messages } from './messages';
import { DUMMY_PASSWORD } from '~/server/db/const';

const router = useRouter();
const route = useRoute();
const { search } = useZip();

const { mode } = route.params as { mode: string };
const isCreate = mode === 'create';
const title = isCreate ? '社員登録' : '社員詳細';
const tabList = ref([
  { id: 'tab1', name: '基本情報' },
  { id: 'tab2', name: '個人情報' },
  { id: 'tab3', name: 'その他' },
]);
const pickedTabId = ref('tab1');
const departmentName = ref('');
const genderList = [
  { id: '0', name: '男性' },
  { id: '1', name: '女性' },
];
const showMessages = ref<string[]>([]);
const isChangePassword = ref(isCreate);

const { fetchEmployeeDetail, fetchGeneralCode } = useEmployee();
const [postList, authorityList, employmentStatusList, incumbencyStatusList, retirementStatusList] =
  await Promise.all([
    fetchGeneralCode('post'),
    fetchGeneralCode('authority'),
    fetchGeneralCode('employment_status'),
    fetchGeneralCode('incumbency_status'),
    fetchGeneralCode('retirement_status'),
  ]);

const formEmployee = reactive<Employees>({
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
  createdEmployee: '',
  createdAt: '',
  updatedEmployee: '',
  updatedAt: '',
});

const formPersonal = reactive<PersonalDatas>({
  employeeCd: '',
  gender: 0,
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
  retirementStatus: null,
  createdEmployee: '',
  createdAt: '',
  updatedEmployee: '',
  updatedAt: '',
});

if (!isCreate) {
  const details = await fetchEmployeeDetail(mode);
  details.forEach((detail) => {
    formEmployee.employeeCd = detail.employeeCd;
    formEmployee.employeeName = detail.employeeName;
    formEmployee.kana = detail.kana;
    formEmployee.email = detail.email;
    formEmployee.password = detail.password;
    formEmployee.tel = detail.tel;
    formEmployee.departmentCd = detail.departmentCd;
    formEmployee.post = detail.post;
    formEmployee.authority = detail.authority;
    formEmployee.employmentStatus = detail.employmentStatus;
    formEmployee.incumbencyStatus = detail.incumbencyStatus;
    formEmployee.loginAt = detail.loginAt;
    formEmployee.failureCount = detail.failureCount;
    formEmployee.lockedAt = detail.lockedAt;
    formEmployee.createdEmployee = detail.createdEmployee;
    formEmployee.createdAt = detail.createdAt;
    formEmployee.updatedEmployee = detail.updatedEmployee;
    formEmployee.updatedAt = detail.updatedAt;
    formPersonal.gender = detail.gender;
    formPersonal.birthday = detail.birthday;
    formPersonal.zipCode = detail.zipCode;
    formPersonal.prefecture = detail.prefecture;
    formPersonal.address = detail.address;
    formPersonal.building = detail.building;
    formPersonal.email = detail.email;
    formPersonal.tel = detail.tel;
    formPersonal.emergencyTel = detail.emergencyTel;
    formPersonal.entryDate = detail.entryDate;
    formPersonal.retirementDate = detail.retirementDate;
    formPersonal.retirementStatus = detail.retirementStatus;
  });
}

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
  formPersonal.gender = 0;
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
  formPersonal.retirementStatus = null;

  // その他
  departmentName.value = '';
  showMessages.value = [];
};

const initPassword = () => {
  if (isChangePassword.value) {
    formEmployee.password = '';
  } else {
    formEmployee.password = DUMMY_PASSWORD;
  }
};

const onCreate = (): void => {
  showMessages.value = [];
  // check
  if (!formEmployee.employeeCd) showMessages.value.push(messages.required.employeeCd);
  if (!formEmployee.employeeName) showMessages.value.push(messages.required.employeeName);
  if (!formEmployee.kana) showMessages.value.push(messages.required.kana);
  if (!formEmployee.email) showMessages.value.push(messages.required.email);
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
        <InputText size="m" v-model="formEmployee.employeeCd" />
      </div>
      <div class="item">
        <LabelItem required>社員名</LabelItem>
        <InputText size="xl" v-model="formEmployee.employeeName" />
      </div>
      <div class="item">
        <LabelItem required>ふりがな</LabelItem>
        <InputText size="xl" v-model="formEmployee.kana" />
      </div>
      <div class="item">
        <LabelItem required>メールアドレス</LabelItem>
        <InputText size="xl" v-model="formEmployee.email" />
      </div>
      <div class="item">
        <LabelItem required>パスワード</LabelItem>
        <InputText
          type="password"
          size="xl"
          v-model="formEmployee.password"
          :disabled="!isChangePassword"
        />
        <label class="checkbox_label" v-if="!isCreate">
          <Checkbox v-model="isChangePassword" @on-change="initPassword" />
          パスワードを変更する
        </label>
      </div>
      <div class="item">
        <LabelItem>連絡先</LabelItem>
        <InputText size="xl" v-model="formEmployee.tel" />
      </div>
      <div class="item">
        <LabelItem>所属部門コード</LabelItem>
        <InputText size="m" v-model="formEmployee.departmentCd" />
        <IconSearch />
        <span class="name_space">
          {{ departmentName }}
        </span>
      </div>
      <div class="item">
        <LabelItem>役職</LabelItem>
        <select v-model="formEmployee.post">
          <option v-for="post in postList" :value="post.code">{{ post.name }}</option>
        </select>
      </div>
      <div class="item">
        <LabelItem>権限</LabelItem>
        <select v-model="formEmployee.authority">
          <option v-for="authority in authorityList" :value="authority.code">
            {{ authority.name }}
          </option>
        </select>
      </div>
      <div class="item">
        <LabelItem>雇用形態</LabelItem>
        <select v-model="formEmployee.employmentStatus">
          <option v-for="employment in employmentStatusList" :value="employment.code">
            {{ employment.name }}
          </option>
        </select>
      </div>
      <div class="item">
        <LabelItem>在職区分</LabelItem>
        <select v-model="formEmployee.incumbencyStatus">
          <option v-for="incumbency in incumbencyStatusList" :value="incumbency.code">
            {{ incumbency.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="content" v-show="pickedTabId === 'tab2'">
      <div class="item">
        <LabelItem>性別</LabelItem>
        <RadioList :list="genderList" id-prefix="gender_" v-model:pickedId="formPersonal.gender" />
      </div>
      <div class="item">
        <LabelItem>生年月日</LabelItem>
        <InputText type="date" size="m" v-model="formPersonal.birthday" />
      </div>
      <div class="item">
        <LabelItem>郵便番号</LabelItem>
        <InputText size="s" @on-blur="searchZip" v-model="formPersonal.zipCode" />
      </div>
      <div class="item">
        <LabelItem>都道府県</LabelItem>
        <select v-model="formPersonal.prefecture">
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
        <InputText size="xl" v-model="formPersonal.address" />
      </div>
      <div class="item">
        <LabelItem>建物</LabelItem>
        <InputText size="xl" v-model="formPersonal.building" />
      </div>
      <div class="item">
        <LabelItem>メールアドレス</LabelItem>
        <InputText size="xl" v-model="formPersonal.email" />
      </div>
      <div class="item">
        <LabelItem>連絡先</LabelItem>
        <InputText size="xl" v-model="formPersonal.tel" />
      </div>
      <div class="item">
        <LabelItem>入社日</LabelItem>
        <InputText type="date" size="m" v-model="formPersonal.entryDate" />
      </div>
      <div class="item">
        <LabelItem>退職日</LabelItem>
        <InputText type="date" size="m" v-model="formPersonal.retirementDate" />
      </div>
      <div class="item">
        <LabelItem>退職区分</LabelItem>
        <select v-model="formPersonal.retirementStatus">
          <option v-for="retirement in retirementStatusList" :value="retirement.code">
            {{ retirement.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="content" v-show="pickedTabId === 'tab3'">
      <div class="item">
        <LabelItem>ログイン日時</LabelItem>
        <InputText type="datetime-local" size="xl" v-model="formEmployee.loginAt" />
      </div>
      <div class="item">
        <LabelItem>ログイン失敗回数</LabelItem>
        <InputText type="number" size="xs" :min="0" v-model="formEmployee.failureCount" />
      </div>
      <div class="item">
        <LabelItem>ロック日時</LabelItem>
        <InputText type="datetime-local" size="xl" v-model="formEmployee.lockedAt" />
      </div>
      <div class="item">
        <LabelItem>作成者</LabelItem>
        <InputText size="xl" v-model="formEmployee.createdEmployee" :disabled="true" />
      </div>
      <div class="item">
        <LabelItem>作成日</LabelItem>
        <InputText
          type="datetime-local"
          size="xl"
          v-model="formEmployee.createdAt"
          :disabled="true"
        />
      </div>
      <div class="item">
        <LabelItem>更新者</LabelItem>
        <InputText size="xl" v-model="formEmployee.updatedEmployee" :disabled="true" />
      </div>
      <div class="item">
        <LabelItem>更新日</LabelItem>
        <InputText
          type="datetime-local"
          size="xl"
          v-model="formEmployee.updatedAt"
          :disabled="true"
        />
      </div>
    </div>
    <ErrorMessage title="社員を登録することができませんでした" :list="showMessages" />
    <div class="buttons">
      <div>
        <ButtonBack @on-back="router.push('/employee/list')" />
      </div>
      <div>
        <ButtonClear size="s" @on-clear="onClear" />
        <ButtonCreate size="s" @on-create="onCreate" />
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.box_create {
  max-width: 800px;
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

.checkbox_label {
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
}

.name_space {
  margin-top: 3px;
  margin-left: 8px;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding-right: 16px;
  margin-top: 16px;
  margin-left: 16px;

  button:first-child {
    margin-right: 8px;
  }
}
</style>
