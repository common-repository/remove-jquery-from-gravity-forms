class RemoveJQueryFromGravityForms {
	constructor() {
		const gravityForms = document.querySelectorAll(".gform_wrapper");
		for (const gravityForm of gravityForms) {
			const formID = gravityForm.getAttribute("id").replace("gform_wrapper_", "");

			// Remove old js events from inputs
			const inputsToClean = gravityForm.querySelectorAll("input");
			for (const formInput of inputsToClean) {
				formInput.removeAttribute("onclick");
				formInput.removeAttribute("onchange");
				formInput.removeAttribute("onkeypress");
			}

			// Paged form
			const formChangePage = (formCurrentPage) => {
				if (formCurrentPage >= formPages.length) {
					formCurrentPage = formPages.length - 1;
				}
				for (const formPage of formPages) {
					formPage.style.display = "none";
				}
				formPages[formCurrentPage].style.display = "block";

				// Update current page text
				const formCurrentPageText = gravityForm.querySelector(".gf_step_current_page");
				if (formCurrentPageText) {
					formCurrentPageText.innerHTML = formCurrentPage + 1;
				}

				// Progressbar
				const formProgress = gravityForm.querySelector(".gf_progressbar_percentage");
				if (formProgress) {
					const percentage = Math.round((100 / formPages.length) * (formCurrentPage + 1));
					formProgress.style.width = percentage + "%";

					// Set formProgressbar classes
					const classList = formProgress.classList;
					const classListArray = Array.from(classList);
					const classListArrayFiltered = classListArray.filter((item) => {
						if (item.split("_")[1] && !isNaN(item.split("_")[1])) {
							return item;
						}
					});
					for (const item of classListArrayFiltered) {
						formProgress.classList.remove(item);
					}
					const formProgressClassList = formProgress.classList;
					const formProgressClassListArray = Array.from(formProgressClassList);
					formProgress.classList.add("percentbar_" + percentage);

					// Set formProgressbar text
					const formProgressText = formProgress.querySelector("span");
					if (formProgressText) {
						formProgressText.innerHTML =
							Math.round((100 / formPages.length) * (formCurrentPage + 1)) + "%";
					}
				}
			};
			const formPages = gravityForm.querySelectorAll(".gform_page");
			if (formPages.length > 1) {
				var formCurrentPage = 0;
				// Next page
				const formNextButtons = gravityForm.querySelectorAll(".gform_next_button");
				for (const formNextButton of formNextButtons) {
					formNextButton.onclick = (e) => {
						e.preventDefault();
						formCurrentPage++;
						formChangePage(formCurrentPage);
					};
				}
				// Previous page
				const formPreviousButtons = gravityForm.querySelectorAll(".gform_previous_button");
				for (const formPreviousButton of formPreviousButtons) {
					formPreviousButton.onclick = (e) => {
						e.preventDefault();
						formCurrentPage--;
						formChangePage(formCurrentPage);
					};
				}
			}

			// Submit form
			gravityForm.onsubmit = (e) => {
				e.preventDefault();
				const formElement = gravityForm.querySelector("form");
				const gravityFormData = new FormData(formElement);

				// Disable submit buttons
				const formSubmitButtons = gravityForm.querySelectorAll(".gform_button[type=submit]");

				for (const formSubmitButton of formSubmitButtons) {
					formSubmitButton.disabled = true;
				}

				const formSubmissionUrl =
					remove_jquery_from_gravityforms_base_url +
					"wp-json/gf/v2/forms/" +
					formID +
					"/submissions";

				fetch(formSubmissionUrl, {
					method: "POST",
					body: gravityFormData,
				})
					.then((response) => {
						return response.json();
					})
					.then((data) => {

						// Reenable submit buttons
						for (const formSubmitButton of formSubmitButtons) {
							formSubmitButton.disabled = false;
						}

						// Show success
						if (data.is_valid) {
							const gravityForm = document.getElementById("gform_wrapper_" + formID);
							gravityForm.innerHTML = data.confirmation_message;

							// Submission failed
						} else {
							// Validation errors
							if (data.validation_messages) {
								const formFields = gravityForm.querySelectorAll(".gfield");

								// Reset error classes and remove old validation messages
								for (const formField of formFields) {
									formField.classList.remove("gfield_error");
									const fieldInputs = formField.querySelectorAll(".ginput_container input");
									for (const fieldInput of fieldInputs) {
										fieldInput.removeAttribute("aria-invalid");
									}
									const formMessages = formField.querySelectorAll(".gfield_description");
									for (const formMessage of formMessages) {
										formMessage.remove();
									}
								}

								// Set error class and add validation message
								for (const messageIndex in data.validation_messages) {
									const formField = Array.from(formFields).find((formField) =>
										formField
											.getAttribute("id")
											.includes("field_" + formID + "_" + messageIndex)
									);
									formField.classList.add("gfield_error");
									const fieldInputs = formField.querySelectorAll(".ginput_container input");
									for (const fieldInput of fieldInputs) {
										fieldInput.setAttribute("aria-invalid", "true");
									}
									const fieldLabel = formField.querySelector(".gfield_label");
									if (fieldLabel) {
										fieldLabel.innerHTML +=
											'<span class="gfield_description validation_message">' +
											data.validation_messages[messageIndex] +
											"</span>";
									}
								}

								// handle error on pages
								if (formPages.length > 1) {
									formCurrentPage = 0;
									formChangePage(formCurrentPage);
								}
							}
						}
					})
					.catch((error) => {
						console.log(error);
					});
			};
		}
	}
}

new RemoveJQueryFromGravityForms();
