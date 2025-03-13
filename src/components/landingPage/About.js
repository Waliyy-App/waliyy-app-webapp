import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col gap-10 w-4/5 lg:w-3/5 mx-auto my-24 text-[#2D133A] bg-white dark:bg-white">
      <h2 className="text-3xl font-bold">About WaliyyApp</h2>
      <div className="flex flex-col gap-8 text-lg mb-10">
        <p>
          WaliyyApp is aimed at eligible Muslim bachelors and ladies who are
          ready for marriage. As part of Islam, the mahaarim plays an important
          role in the marriage process and this is why they also have a vital
          role on our app. You are here because you are looking for a wife for
          yourself or a husband for your female relative. (Mahram/Mahaarim:
          father and brothers of a Muslim lady or her paternal grandfather or
          uncles).
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
          You are here because you are searching for a spouse for yourself or
          you have young people who are ready to marry and you are actively
          seeking suitable Muslim singles. We wish to support you to achieve
          this objective in line with the dictates of the Qur’an and Sunnah.
        </p>
        <p>
          In order to do this, members need to familiarise themselves with
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
          while utilizing our services.
        </li>
        <li>
          Provide complete and sincere information about each candidate as per
          the approved template.
        </li>
        <li>
          While the platform is open to everyone, only the mahaarim's contact
          will be shared with the male candidate in case of interest.
        </li>
        <li>
          This web link can be shared to invite only Muslims of Nigerian
          heritage.
        </li>
        <li>
          We recognise that our level of imaan and understanding is different
          and we encourage you to follow the guidance of the Qur’an and Sunnah
          when utilizing our app and be tolerant towards others.
        </li>
        <li>
          We highly recommend that you contact your local mosque and seek
          further guidance/counselling towards the finalisation of your nikah
          contract.
        </li>
        <li>
          We advise you to be diligent in researching prospective candidates,
          WaliyyApp accepts no responsibility for false information provided on
          the app.
        </li>
      </ol>

      <h2 className="text-3xl font-bold">Waliyy Role</h2>
      <div className="flex flex-col gap-8 text-lg mb-10">
        <p>
          Mabrook and congratulations, your ward has found a match! <br /> Not
          sure what to do next? Here are a few suggestions.
        </p>
        <ol className="flex flex-col gap-3 text-lg list-disc list-outside px-6">
          <li>
            The young man should make an initial contact with you to introduce
            himself.
          </li>
          <li>
            Set up a meeting at a time convenient for your ward, the suitor and
            of course, yourself.
          </li>
          <li>Attend the meeting and subsequent ones.</li>
        </ol>
        <p>
          They like each other and want to get married… <br /> Excellent
          news!🎈🥳
          <br />
          <br />
          Contact your local masjid and follow their nikah process. Don’t forget
          that all important pre-marriage counselling. <br />
          <br />
          WaliyyApp wishes you a happy married life🎊
        </p>
      </div>
    </div>
  );
};

export default About;
