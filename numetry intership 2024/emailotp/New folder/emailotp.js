function sendOTP() {
	const email = document.getElementById('email');
	const otpverify = document.getElementsByClassName('otpverify')[0];
	let otp_val=Math.floor(100000 + Math.random() * 900000).toString();
	let emailBody=document.getElementById('otp-btn').innerText = `Your OTP is:${otp_val}`;
	Email.send({
		SecureToken : "5c471e79-4250-4fc2-9927-f2d6bef76f7c",
		To : email.value,
		From : "srivastavvandu@gmail.com",
		Subject : "Email OTP",
		Body : emailBody,
	}).then(
		message => {
			if (message === "OK") {
				alert("OTP sent to your email " + email.value);
	
				otpverify.style.display = "flex";
				const otp_inp = document.getElementById('otp_inp');
				const otp_btn = document.getElementById('otp-btn');
	
				otp_btn.addEventListener('click', () => {
					if (otp_inp.value == otp_val) {
						alert("Email address verified...");
					}
					else {
						alert("Invalid OTP");
					}
				})
			}
		}
	);
	}
	
	
	
	