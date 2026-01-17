import React from 'react';
import FemaleIcon from '../../assets/illustrations/muslim_lady_founder.svg';
import MaleIcon from '../../assets/illustrations/muslim_founder.svg';
import FounderBio from '../../common/FounderBio';

const About = () => {
  return (
    <div className="flex flex-col gap-10 w-4/5 lg:w-4/5 mx-auto my-24 text-[#2D133A] bg-white dark:bg-white">
      <h2 className="text-3xl text-center font-bold">Meet our Founders</h2>
      <FounderBio
        imageSrc={MaleIcon}
        bio="Olanlege Adebayo AbdulFattah is an engineer with over 25 years
          experience in manufacturing, construction and Oil and Gas sector
          at the technical and management levels. He graduated from the
          prestigious Obafemi Awolowo University, Ile Ife from the
          department of Chemical Engineering. While in OAU, he held several
          executive positions at the branch and Area Unit levels of MSSN and
          was also MCAN coordinator at Ikot Abasi, Akwa Ibom State where he
          served. He also served at various executive levels in UNIFEMGA
          (University of Ife Muslim Graduates Association) where he is the
          immediate past Global President. He is happily married with
          children and passionate about Youth issues. He is from Ijebu Ode
          in Ogun State, based mainly in Ibadan, Nigeria but has family also
          in the US and the UK."
        imageOnLeft={true}
        gradientFrom="from-purple-700"
        gradientTo="to-indigo-500"
      />

      <FounderBio
        imageSrc={FemaleIcon}
        bio="Rasheedah Raji is a retired teacher. She spends her time
          volunteering for community projects which empower the youth and
          ladies. With a degree in Social Policy and decades of experience
          acquired from supporting young people, she has good understanding
          of the importance of family relationships and bonds; and the need
          for youngsters to get married in order to protect themselves
          according to Islamic principles. WaliyyApp was borne out of
          concern of the challenges currently facing Muslim youth all over
          the world, and in particular those of Nigerian descent who wish to
          marry fellow Nigerians but struggle to achieve their desire."
        imageOnLeft={false}
        gradientFrom="from-pink-700"
        gradientTo="to-rose-500"
      />

      <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full my-4"></div>
      <h2 className="text-3xl text-center font-bold">About WaliyyApp</h2>
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
          parents to help our singles find good Muslim spouses and contribute to
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

      <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full my-4"></div>
      <h2 className="text-3xl text-center font-bold">Rules of WaliyyApp</h2>
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
        <li>
          Do not use vulgar, sexual or inappropriate language.
        </li>
      </ol>

      <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full my-4"></div>
      <h2 className="text-3xl text-center font-bold">Waliyy Role</h2>
      <div className="flex flex-col gap-8 text-lg mb-10">
        <p>
          Mabrook and congratulations, your single has found a match! <br /> Not
          sure what to do next? Here are a few suggestions.
        </p>
        <ol className="flex flex-col gap-3 text-lg list-disc list-outside px-6">
          <li>
            The young man should make an initial contact with you to introduce
            himself.
          </li>
          <li>
            Set up a meeting at a time convenient for your single, the suitor
            and of course, yourself.
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
