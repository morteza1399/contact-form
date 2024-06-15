<template>
  <div class="bg-white md:w-6/12 w-11/12 mx-auto p-5 rounded-lg">
    <h1 class="text-2xl font-bold">Contact Us</h1>
    <pre>{{ contact }}</pre>
    <form @submit.prevent="handleSubmit">
      <div class="flex lg:flex-row flex-col justify-between my-3">
        <AppInput label="First Name" type="text" v-model="contact.first_name" />
        <AppInput label="Last Name" type="text" v-model="contact.last_name" />
      </div>
      <div class="my-3">
        <AppInput label="Email Address" type="email" v-model="contact.email_address" />
      </div>
      <div class="my-3">
        <label for="#" class="text-sm text-[#2b4246]">
          Query Type
          <span class="text-[#0c7d69]">*</span>
        </label>
        <div class="flex sm:flex-row flex-col justify-between">
          <div :class="generalEnquiryClass">
            <AppInput
              type="radio"
              label="General Enquiry"
              name="QueryType"
              value="General Enquiry"
              v-model="contact.query_type"
            >
              <template #radio>
                <div>radio</div>
              </template>
            </AppInput>
            <!-- <img
              v-if="contact.query_type === 'General Enquiry'"
              class="mr-2"
              src="./assets/images/icon-radio-selected.svg"
              alt="general-enquiry"
            />
            <input
              v-else
              class="mr-2 focus:outline-none appearance-none bg-white w-5 h-5 rounded-full border border-[#87a3a6] cursor-pointer"
              type="radio"
              name="General Enquiry"
              id="General Enquiry"
              value="General Enquiry"
              v-model="contact.query_type"
            />
            <span class="text-sm text-[#2b4246]">General Enquiry</span>-->
          </div>
          <div :class="supportRequestClass">
            <AppInput
              type="radio"
              label="Support Request"
              name="QueryType"
              value="Support Request"
              v-model="contact.query_type"
            >
              <template #radio>
                <div>radio</div>
              </template>
            </AppInput>
            <!-- <img
              v-if="contact.query_type === 'Support Request'"
              class="mr-2"
              src="./assets/images/icon-radio-selected.svg"
              alt="general-enquiry"
            />
            <input
              v-else
              class="mr-2 focus:outline-none appearance-none bg-white w-5 h-5 rounded-full border border-[#87a3a6] cursor-pointer"
              type="radio"
              name="Support Request"
              id="Support Request"
              value="Support Request"
              v-model="contact.query_type"
            />
            <span class="text-sm text-[#2b4246]">Support Request</span>-->
          </div>
        </div>
      </div>
      <div class="my-3">
        <AppInput label="Message" type="textarea" is-text-area :rows="4" v-model="contact.message" />
      </div>
      <div class="my-3">
        <AppInput
          type="checkbox"
          label="I consent to being contacted by the
        team"
          is-check-box
          v-model="contact.contacted"
        >
          <template #checkbox>
            <div @click="toggleCheckBox">
              <img
                v-if="contact.contacted"
                src="./assets/images/icon-checkbox-check.svg"
                alt="checked"
              />
              <span v-else class="flex w-4 h-4 border border-[#87a3a6] bg-white"></span>
            </div>
          </template>
        </AppInput>
      </div>
      <AppInput type="submit" />
    </form>
  </div>
  <!-- <div class="attribution">
    Challenge by
    <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
    Coded by <a href="#">Morteza Abdollahi</a>.
  </div>-->
</template>

<script setup>
import { reactive, computed } from "vue";
import AppInput from "./components/AppInput.vue";

const contact = reactive({
  first_name: "",
  last_name: "",
  email_address: "",
  query_type: "",
  message: "",
  contacted: false
});

const baseClass = "flex items-center grow p-3 my-2 mr-3 border rounded-lg";
const activeClass = "bg-[#dff1e7] border-[#0c7d69]";
const inactiveClass = "bg-white border-[#87a3a6]";

const generalEnquiryClass = computed(() =>
  getClass(contact.query_type, "General Enquiry")
);
const supportRequestClass = computed(() =>
  getClass(contact.query_type, "Support Request")
);

const getClass = (queryType, targetType) => {
  return `${baseClass} ${
    queryType === targetType ? activeClass : inactiveClass
  }`;
};

const toggleCheckBox = () => {
  contact.contacted = !contact.contacted;
};

const handleSubmit = () => {
  console.log("handleSubmit");
  console.log(contact);
};
</script>
