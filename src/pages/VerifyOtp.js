import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function VerifyOtp() {
	const navigate = useNavigate();

	const initialValues = {
		otp: "",
	};

	const validationSchema = Yup.object({
		otp: Yup.string()
			.min(6, "Must be 6 characters or more")
			.required("Enter OTP"),
	});

	return (
		<div className="w-[360px] sm:w-[400px] px-5 sm:px-0 mx-auto py-24">
			<div className="flex flex-col items-center jutify-center mb-20">
				<p className="text-2xl text-[#2D133A] font-medium mb-2">
					Enter Reset Token
				</p>
			</div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					try {
						navigate("/login");
					} catch (err) {
						toast.error(err.response.data.message);
					}
				}}
			>
				<Form>
					<div className={`flex flex-col w-full relative`}>
						<label
							className="text-sm font-medium mb-2 text-[#2D133A]"
							htmlFor="token"
						>
							Token
						</label>
						<div className="w-full">
							<input
								name="otp"
								className="relative text-input w-full h-11 border-b border-b-[#CDD1D0] focus:outline-none focus:border-b focus:border-b-[#BA9FFE]"
							/>
						</div>
					</div>
					<button
						type="submit"
						className="my-11 w-full mb-16 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300"
					>
						Submit
					</button>
				</Form>
			</Formik>
		</div>
	);
}
