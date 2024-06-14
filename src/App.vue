<template>
  <div class="bg-white md:w-6/12 w-11/12 mx-auto p-5 rounded-lg">
    <h1 class="text-2xl font-bold">Contact Us</h1>
    <form @submit.prevent="handleSubmit">
      <div class="flex lg:flex-row flex-col justify-between my-3">
        <AppInput label="First Name" type="text" v-model="contact.first_name" />
        <AppInput label="Last Name" type="text" v-model="contact.last_name" />
      </div>
      <div class="my-3">
        <AppInput
          label="Email Address"
          type="email"
          v-model="contact.email_address"
        />
      </div>
      <div class="my-3">
        <label for="#" class="text-sm text-[#2b4246]"
          >Query Type <span class="text-[#0c7d69]">*</span></label
        >
        <div class="flex sm:flex-row flex-col justify-between">
          <div
            class="flex items-center grow p-3 my-2 mr-3 border border-[#87a3a6] rounded-lg"
          >
            <input
              class="m-2 focus:outline-none"
              type="radio"
              name="General Enquiry"
              id="General Enquiry"
              value="General Enquiry"
              v-model="contact.query_type"
            />
            <span class="text-sm text-[#2b4246] peer-checked:bg-red-600">
              General Enquiry
            </span>
          </div>
          <div
            class="flex items-center grow p-3 my-2 mr-3 border border-[#87a3a6] rounded-lg"
          >
            <input
              class="m-2 focus:outline-none"
              type="radio"
              name="Support Request"
              id="Support Request"
              value="Support Request"
              v-model="contact.query_type"
            />
            <span class="text-sm text-[#2b4246]"> Support Request </span>
          </div>
        </div>
      </div>
      <div class="my-3">
        <AppInput
          label="Message"
          type="textarea"
          is-text-area
          :rows="4"
          v-model="contact.message"
        />
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
  </div> -->
</template>

<script setup>
import { reactive } from "vue";
import AppInput from "./components/AppInput.vue";

const contact = reactive({
  first_name: "",
  last_name: "",
  email_address: "",
  query_type: "",
  message: "",
  contacted: false,
});

const handleSubmit = () => {
  console.log("handleSubmit");
  console.log(contact);
};
</script>
