'use server';
import RegisterForm from "../../components/app_components/register_form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';


const RegisterFormPage = async () => {
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
        <div className="flex flex-col justify-center items-center  bg-color3_1 bg-opacity-30 backdrop-blur-xl px-4 py-3 animate-scaleIn rounded-[16px] shadow-[0_1px_20px_10px_rgba(0,0,0,0.45)] sm:px-8 sm:py-10 sm:w-auto">
          <h1 className="text-white font-semibold text-[22px] mb-[4px] md:text-[26px]">Cтворення Aватара</h1>
          <RegisterForm addData={addData} />
        </div>
      </div>

    </>

  );
}

export default RegisterFormPage;



