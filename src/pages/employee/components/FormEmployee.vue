<script setup lang="ts">
import { DUMMY_PASSWORD } from '~/server/db/const';
import { messages } from '../messages';
import type { Detail } from '../[employeeCd].vue';
import Prefecture from './Prefecture.vue';
import ButtonDelete from '~/components/button/ButtonDelete.vue';
import type Modal from '~/components/Modal.vue';

type Props = {
  isCreate: boolean;
  title: string;
  detail?: Detail;
};
const props = defineProps<Props>();

const router = useRouter();
const { search } = useZip();
const { fetchCategory } = useGeneralCode();
const { register, del } = useEmployee();

const tabList = ref([
  { id: 'tab1', name: '基本情報' },
  { id: 'tab2', name: '個人情報' },
  { id: 'tab3', name: 'その他' },
]);
const pickedTabId = ref('tab1');
const showMessages = ref<string[]>([]);
const departmentName = ref('');
const genderList = [
  { id: '0', name: '男性' },
  { id: '1', name: '女性' },
];
const isChangePassword = ref(props.isCreate);

const initDetail = props.detail ?? defaultEmployee;
let formEmployee = reactive({ ...initDetail });

const [postList, authorityList, employmentStatusList, incumbencyStatusList, retirementStatusList] =
  await Promise.all([
    fetchCategory('post'),
    fetchCategory('authority'),
    fetchCategory('employment_status'),
    fetchCategory('incumbency_status'),
    fetchCategory('retirement_status'),
  ]);

const modal = ref<InstanceType<typeof Modal> | null>(null);

function initPassword() {
  if (isChangePassword.value) {
    formEmployee.password = '';
  } else {
    formEmployee.password = DUMMY_PASSWORD;
  }
}

async function searchZip() {
  const zipInfo = await search(formEmployee.zipCode);

  if (!zipInfo) {
    formEmployee.prefecture = '';
    formEmployee.address = '';
    return;
  }

  const info = zipInfo.results[0];

  formEmployee.prefecture = info.address1;
  formEmployee.address = info.address2 + info.address3;
}

function onClear() {
  showMessages.value = [];
  Object.assign(formEmployee, initDetail);
}

async function onCreate() {
  showMessages.value = [];

  // check
  if (!formEmployee.employeeCd) showMessages.value.push(messages.required.employeeCd);
  if (!formEmployee.employeeName) showMessages.value.push(messages.required.employeeName);
  if (!formEmployee.kana) showMessages.value.push(messages.required.kana);
  if (!formEmployee.email) showMessages.value.push(messages.required.email);
  if (!formEmployee.password) showMessages.value.push(messages.required.password);

  // create
  const loginInfo = useLoginInfo();
  formEmployee.createdEmployee = loginInfo.value.employeeId;
  formEmployee.updatedEmployee = loginInfo.value.employeeId;
  await register(formEmployee);

  router.push('/employee/list');
}

function openModal() {
  modal.value?.openDialog();
}

async function onDelete() {
  await del(formEmployee.employeeCd);
  router.push('/employee/list');
}
</script>

<template>
  <H1Title>{{ props.title }}</H1Title>
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
        <RadioList :list="genderList" id-prefix="gender_" v-model:pickedId="formEmployee.gender" />
      </div>
      <div class="item">
        <LabelItem>生年月日</LabelItem>
        <InputText type="date" size="m" v-model="formEmployee.birthday" />
      </div>
      <div class="item">
        <LabelItem>郵便番号</LabelItem>
        <InputText size="s" @on-blur="searchZip" v-model="formEmployee.zipCode" />
      </div>
      <div class="item">
        <LabelItem>都道府県</LabelItem>
        <Prefecture v-model="formEmployee.prefecture" />
      </div>
      <div class="item">
        <LabelItem>住所</LabelItem>
        <InputText size="xl" v-model="formEmployee.address" />
      </div>
      <div class="item">
        <LabelItem>建物</LabelItem>
        <InputText size="xl" v-model="formEmployee.building" />
      </div>
      <div class="item">
        <LabelItem>メールアドレス</LabelItem>
        <InputText size="xl" v-model="formEmployee.emailPersonal" />
      </div>
      <div class="item">
        <LabelItem>連絡先</LabelItem>
        <InputText size="xl" v-model="formEmployee.telPersonal" />
      </div>
      <div class="item">
        <LabelItem>緊急連絡先</LabelItem>
        <InputText size="xl" v-model="formEmployee.emergencyTel" />
      </div>
      <div class="item">
        <LabelItem>入社日</LabelItem>
        <InputText type="date" size="m" v-model="formEmployee.entryDate" />
      </div>
      <div class="item">
        <LabelItem>退職日</LabelItem>
        <InputText type="date" size="m" v-model="formEmployee.retirementDate" />
      </div>
      <div class="item">
        <LabelItem>退職区分</LabelItem>
        <select v-model="formEmployee.retirementStatus">
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
      <div class="button_group">
        <ButtonDelete variant="secondary" size="s" @on-delete="openModal" />
        <Modal ref="modal" title="社員の情報をマスタから削除しますか？" @on-callback="onDelete" />
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
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 16px;
}

.button_group {
  display: flex;
  gap: 8px;

  button:first-child {
    margin-right: 24px;
  }
}
</style>
