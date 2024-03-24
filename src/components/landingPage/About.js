import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col gap-10 w-4/5 lg:w-3/5 mx-auto my-24 text-[#2D133A] bg-white dark:bg-white">
      <h2 className="text-3xl font-bold">About WaliyyApp</h2>
      <div className="flex flex-col gap-8 text-lg mb-10">
        <p>
          WaliyyApp is aimed at parents and guardians of Muslim singles, male
          and female who are ready for marriage.
        </p>
        <p>
          We are striving to carry out our duties and responsibilities as
          parents to help our wards find good Muslim spouses and contribute to
          reducing the fitna of Zina and divorce in our communities. For too
          long, we have left our youths to find spouses by themselves without
          any assistance from parents and this has created so many problems for
          our children and the society.
        </p>
        <p>
          You are here because you either have a child/children or wards who are
          ready to marry or should be married and you are actively seeking
          suitable Muslim spouses for them as Allah has commanded us. We wish to
          support you to achieve this objective in line with the dictates of the
          Qur’an and Sunnah.
        </p>
        <p>
          For us to achieve our aim, members need to familiarise themselves with
          simple group rules and follow them as diligently as possible. This is
          a learning process for us all and the group admins are open to
          suggestions for improvement to better improve the process and outcomes
          in shaa Allah. However, we shall not hesitate to evict anyone
          violating the rules, particularly after warning.
        </p>
      </div>

      <h2 className="text-3xl font-bold">Rules of WaliyyApp</h2>
      <ol className="flex flex-col gap-6 text-lg mb-10 list-decimal list-outside px-6">
        <li>
          Have the consciousness of Allah with all your dealings and be honest
          while utilising our services.
        </li>
        <li>
          Provide complete and sincere information about each candidate as per
          the approved template.
        </li>
        <li>
          While the platform is open to all parents and guardians, only the
          Waliyy’s (male - father, uncle, brother, grandfather, etc) contact
          will be shared with the candidate in case of interest.
        </li>
        <li>
          This web link can be shared to invite only Muslims of Nigerians and
          their descendants.
        </li>
        <li>
          We recognise that our level of imaan and understanding is different
          and we will appreciate the tolerance of everyone and wise guidance to
          the Qur’an and Sunnah in all our dealings.
        </li>
        <li>
          We advise you to be diligent in researching prospective candidates,
          WaliyyApp accepts no responsibility for false information provided on
          the app.
        </li>
      </ol>
    </div>
  );
};

export default About;
