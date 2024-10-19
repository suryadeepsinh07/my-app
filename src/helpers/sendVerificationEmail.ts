import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { Verification } from "next/dist/lib/metadata/types/metadata-types";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string,
): Promise<ApiResponse>{

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry message | Verification code',
            react: VerificationEmail({username,otp:verifyCode}),
          });
        return {success:true,message:'Verification email send successfully'}
    } catch (emailError) {
        console.log("Error sending verification email",emailError);
        return {success:false,message:'Failed to send verification email'}
    }
}