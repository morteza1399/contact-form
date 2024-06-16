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
                <div class="flex" @click="contact.query_type = 'General Enquiry'">
                  <img
                    v-if="contact.query_type === 'General Enquiry'"
                    src="./assets/images/icon-radio-selected.svg"
                    alt="selected"
                  />
                  <span
                    v-else
                    class="bg-white w-5 h-5 rounded-full border border-[#87a3a6] cursor-pointer"
                  ></span>
                </div>
              </template>
            </AppInput>
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
                <div class="flex" @click="contact.query_type = 'Support Request'">
                  <img
                    v-if="contact.query_type === 'Support Request'"
                    src="./assets/images/icon-radio-selected.svg"
                    alt="selected"
                  />
                  <span
                    v-else
                    class="bg-white w-5 h-5 rounded-full border border-[#87a3a6] cursor-pointer"
                  ></span>
                </div>
              </template>
            </AppInput>
          </div>
        </div>
      </div>
      <div class="my-3">
        <AppTextArea label="Message" v-model="contact.message" />
      </div>
      <div class="my-3">
        <AppInput
          type="checkbox"
          label="I consent to being contacted by the
        team"
          is-check-box
          v-model="contact.contacted"
        />
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
import AppTextArea from "./components/AppTextArea.vue";

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
