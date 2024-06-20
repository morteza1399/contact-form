<template>
  <div class="bg-white md:w-5/12 w-11/12 mx-auto p-5 rounded-xl text-[#2b4246]">
    <h1 class="text-2xl font-bold mx-2">Contact Us</h1>
    <form @submit.prevent="handleSubmit">
      <div class="flex lg:flex-row flex-col justify-between my-3">
        <AppInput
          label="First Name"
          type="text"
          v-model="contact.first_name"
          :rules="[required]"
          :externalError="errors.first_name"
          @update:externalError="errors.first_name = $event"
        />
        <AppInput
          label="Last Name"
          type="text"
          v-model="contact.last_name"
          :rules="[required]"
          :externalError="errors.last_name"
          @update:externalError="errors.last_name = $event"
        />
      </div>
      <div class="my-3">
        <AppInput
          label="Email Address"
          type="email"
          v-model="contact.email_address"
          :rules="[required, email]"
          :externalError="errors.email_address"
          @update:externalError="errors.email_address = $event"
        />
      </div>
      <div id="query" class="my-3">
        <label for="#" class="text-sm mx-2">
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
              :rules="[queryType]"
              :externalError="errors.query_type"
              @update:externalError="errors.query_type = $event"
            />
          </div>
          <div :class="supportRequestClass">
            <AppInput
              type="radio"
              label="Support Request"
              name="QueryType"
              value="Support Request"
              v-model="contact.query_type"
            />
          </div>
        </div>
      </div>
      <div class="my-3">
        <AppTextArea
          label="Message"
          v-model="contact.message"
          :rules="[required]"
          :externalError="errors.message"
          @update:externalError="errors.message = $event"
        />
      </div>
      <div id="check" class="my-3">
        <AppInput
          type="checkbox"
          label="I consent to being contacted by the
        team"
          is-check-box
          v-model="contact.contacted"
          :rules="[checked]"
          :externalError="errors.contacted"
          @update:externalError="errors.contacted = $event"
        />
      </div>
      <AppInput type="submit" />
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import AppInput from "./components/AppInput.vue";
import AppTextArea from "./components/AppTextArea.vue";
import { useToast } from "./composables/toast";
import { useValidate } from "./composables/validate";

const { required, email, queryType, checked, validateInput } = useValidate();
const { createToast } = useToast();

const contact = reactive({
  first_name: "",
  last_name: "",
  email_address: "",
  query_type: "",
  message: "",
  contacted: false,
});

const errors = reactive({
  first_name: "",
  last_name: "",
  email_address: "",
  query_type: "",
  message: "",
  contacted: "",
});

const BASE_CLASS = "flex items-center grow p-3 m-2 border rounded-lg";
const ACTIVE_CLASS = "bg-[#dff1e7] border-[#0c7d69]";
const INACTIVE_CLASS = "bg-white border-[#87a3a6]";

const generalEnquiryClass = computed(() =>
  getClass(contact.query_type, "General Enquiry")
);
const supportRequestClass = computed(() =>
  getClass(contact.query_type, "Support Request")
);

const getClass = (queryType, targetType) => {
  return `${BASE_CLASS} ${
    queryType === targetType ? ACTIVE_CLASS : INACTIVE_CLASS
  }`;
};

const handleSubmit = () => {
  let isValid = true;
  if (!validateInput([required], contact.first_name)) isValid = false;
  if (!validateInput([required], contact.last_name)) isValid = false;
  if (!validateInput([required, email], contact.email_address)) isValid = false;
  if (!validateInput([queryType], contact.query_type)) isValid = false;
  if (!validateInput([required], contact.message)) isValid = false;
  if (!validateInput([checked], contact.contacted)) isValid = false;

  if (isValid) {
    createToast(
      `<div class="flex items-center"><img class="w-4 h-4 mr-2" src="../src/assets/images/icon-success-check.svg" alt="checked"/> <strong class="text-sm">Message Sent!</strong></div><div><small class="text-[10px] text-[#87a3a6] leading-none">Thanks for completing the form. We'll be in touch soon!</small></div>`,
      {
        theme: "colored",
        type: "success",
        position: "top-center",
        progress: 0,
        dangerouslyHTMLString: true,
        closeButton: false,
        icon: false,
        toastStyle: {
          backgroundColor: "#2b4246",
          padding: "15px",
          borderRadius: "10px",
          fontFamily: "karla",
        },
      }
    );
  } else {
    errors.first_name = required(contact.first_name);
    errors.last_name = required(contact.last_name);
    errors.email_address =
      required(contact.email_address) || email(contact.email_address);
    errors.query_type = queryType(contact.query_type);
    errors.message = required(contact.message);
    errors.contacted = checked(contact.contacted);
  }
};
</script>
