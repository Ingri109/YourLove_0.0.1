'use server';
import RegisterForm from "../../components/app_components/register_form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import Login from "@/app/Login";


const RegisterFormPage = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const addData = async (formData: FormData) => {
    'use server';

    const rawFormData = {
      name: formData.get('name'),
      age: formData.get('age'),
      gender: formData.get('gender')
    }

    const supabase = createServerActionClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    console.log(user?.email);

    if (user) {
      await supabase.from('users_info').insert({
        id: user.id,
        email: user?.email,
        name: rawFormData.name,
        age: rawFormData.age,
        gender: rawFormData.gender

      });
      redirect('/account')
    }
  }

 

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col justify-center items-center bg-color3_1 bg-opacity-30 backdrop-blur-xl px-8 py-10 animate-scaleIn rounded-[16px] shadow-[0_15px_40px_-5px_rgba(0,0,0,0.3)] shadow-color4_2">
          <h1 className="text-white font-semibold text-[26px] mb-[4px]">Cтворення Aватара</h1>
          <RegisterForm addData={addData} />
        </div>
      </div>

    </>

  );
}

export default RegisterFormPage;



