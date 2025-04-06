import BrownButton from "../components/BrownButton";


export default function About() {
  return (
    <div className ="min-h-screen  bg-(--color-background) text-(--color-text) pb-8">
      
      {/* 1.Intro Section  - About */}
      <section className ="py-8 px-16 md:px-24 lg:px-88">
        <h1 className="font-bold text-5xl ">About <br className ="md:hidden"></br> KatsuBook</h1> 
        <p className ="my-8 font-bold text-xl"> 
          We believe… books are not just stories, but experiences that bring life to color.</p>
        <p className ="my-8 text-l"> 
          KatsuBook was founded by a community of passionate readers with boundless imagination. "Katsu" means victory, symbolizing how reading can transport you to new worlds.</p>
        <a href ="#contact">
          <BrownButton
          text ="Contact Us"
          />
        </a>
      </section>

      {/* 2.Our Service and Our Impact Section -About */}
      <section className="md:flex px-12 gap-x-8 justify-center lg:px-72">
        {/* 2.1. Our Service Section */}
        <div className="rounded-lg bg-(--color-banner) py-8 px-16 mb-8 md:w-1/2">
          <h2 className="font-bold text-2xl  "> Our Services</h2>
          <h3 className="font-bold text-xl mt-8 mb-2">1.Read with us</h3>
          <p className="text-l">
            We gathered  manga and fantasy novels  with  heart-pounding stories conveniently available for purchase. </p>
          <h3 className="font-bold text-xl mt-8 mb-2">2.Promote with us</h3>
          <p className="text-l">
          Reach thousands of passionate readers by advertising your service or product here.  </p>
        </div>

        {/* 2.. Our Impact Section */}
        <div className="rounded-lg bg-(--color-banner) py-8 px-16 mb-8 md:w-1/2">
          <h2 className="font-bold text-2xl  "> Our Impacts</h2>
          <h3 className="text-5xl mt-8 mb-2">100K</h3>
          <p className="text-l"> passionate readers </p>
          <h3 className="text-5xl mt-8 mb-2">10K</h3>
          <p className="text-l"> active monthly visitors </p>
          <h3 className="text-5xl mt-8 mb-2">60%</h3>
          <p className="text-l"> of users return to the site weekly </p>
        </div>
      </section>

      {/* 3.Contact-About */}
      <section id="contact" className="md:flex px-12 justify-center lg:px-72">
        <div className="rounded-lg bg-(--color-banner) py-8 px-16 mb-8 w-full">
            <h2 className="font-bold text-3xl "> Contact Us</h2>
            {/* contact details */}
            <div className ="lg:flex gap-x-40 ">
              {/* 3.1. Contact Address and Phone*/}
              <div className = "lg:w-1/2">
                <div>
                  <h3 className="font-bold text-xl mt-8 mb-2">Address</h3>
                  <p className="text-l"> 123/45 Sai Watthanatham Road, Bang Khun Non Subdistrict, Bangkok Noi District, Bangkok 10150, Thailand.</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl mt-8 mb-2">Phone</h3>
                  <p className="text-l">099-123-4567</p>
                </div>
              
              </div>

              {/* 3.2. Contact Email*/}
              <div className = "lg:w-1/2">
                <div>
                  <h3 className="font-bold text-xl mt-8 mb-2">Email</h3>
                  <p className="text-l">contact@katsubook.com</p>
                  <BrownButton
                    text = "Send Email"
                    onClick={() => window.location.href = "mailto:contact@katsubook.com"}
                    className ="mt-8"
                  />
                </div>
              </div>
             

            </div>

            
          </div>

      </section>
      

    </div>
  );
}

