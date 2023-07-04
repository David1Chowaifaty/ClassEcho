import Reviews from "@/components/reviews";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="px-10  text-center lg:text-left lg:space-y-10">
      <section className="items-center flex flex-col lg:flex-row-reverse lg:py-[5vh] lg:h-fit lg:justify-around ">
        <Image
          alt="Home image"
          src={
            "https://images.pexels.com/photos/5212685/pexels-photo-5212685.jpeg?auto=compress&cs=tinysrgb&w=1200"
          }
          height={1000}
          width={1000}
          className="rounded-lg mb-10 lg:h-[50vh] lg:w-[40vw]"
        />

        <div className="max-w-lg">
          <h1 className="text-2xl font-bold mb-4 lg:text-4xl lg:mb-8">
            Empowerment Unleashed. Ignite Curiosity.
          </h1>
          <p className="text-sm mb-3 md:text-base lg:mb-6">
            Discover an exciting world of knowledge with ClassEcho. Tap into
            endless possibilities to learn, teach, and inspire others in our
            thriving community. Together, we’re redefining education for the
            modern era.
          </p>
          <Link
            href={"/login"}
            className={buttonVariants({ variant: "default" })}
          >
            Get Started
          </Link>
        </div>
      </section>
      <section className="min-h-screen py-10 space-y-10 ">
        <div className="flex flex-col-reverse gap-8 items-center lg:flex-row-reverse lg:py-[10vh] lg:h-fit lg:justify-around ">
          <div className="max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 lg:text-3xl lg:mb-8">
              Create Courses and Fuel the Growing Community
            </h2>
            <p className="text-sm mb-3 md:text-base lg:mb-6">
              Unleash the potential in you and others by creating engaging
              courses. Encourage the curious and passionate minds that make
              ClassEcho a thriving community.
            </p>
          </div>
          <Image
            src="https://images.pexels.com/photos/7516347/pexels-photo-7516347.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="createClasses"
            height={1000}
            width={1000}
            className="lg:h-[60vh] lg:w-[50vw] rounded-tr-2xl rounded-lg"
          />
        </div>
        <div className="flex items-center gap-8 flex-col-reverse lg:flex-row lg:py-[10vh] lg:h-fit lg:justify-around ">
          <div className="max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 lg:text-3xl lg:mb-8">
              Learn, Teach, and Inspire with Cutting-Edge Tools
            </h2>
            <p className="text-sm mb-3 md:text-base lg:mb-6">
              ClassEcho offers an interactive platform for seamless learning and
              teaching experiences. Elevate the knowledge quest with tools
              tailored to your needs.
            </p>
          </div>
          <Image
            src="https://images.pexels.com/photos/5905700/pexels-photo-5905700.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="createClasses"
            height={1000}
            width={1000}
            className="lg:h-[50vh] lg:w-[35vw] rounded-lg"
          />
        </div>
      </section>

      <h1 className=" text-xl lg:text-4xl font-semibold text-center mb-10">
        Reviews
      </h1>

      <section className="flex flex-col items-center gap-5 lg:flex-row lg:justify-evenly py-8">
        <Reviews
          image="https://images.pexels.com/photos/1181579/pexels-photo-1181579.jpeg?auto=compress&cs=tinysrgb&w=600"
          name="Alexander Graham"
          description="Elevated my learning experience to new heights."
        />
        <Reviews
          image="https://images.pexels.com/photos/7533347/pexels-photo-7533347.jpeg?auto=compress&cs=tinysrgb&w=600"
          name="Ada Lovelace"
          description="Helped me connect with a vibrant community of learners."
        />
        <Reviews
          image="https://images.pexels.com/photos/16922807/pexels-photo-16922807/free-photo-of-red-dress.png?auto=compress&cs=tinysrgb&w=600"
          name="Richard Feynman"
          description="Empowered me to share my knowledge seamlessly."
        />
      </section>
      <section className="flex items-center justify-center text-center py-20">
        <div className="max-w-lg">
          <h1 className="text-2xl font-bold mb-4 lg:text-4xl lg:mb-8">
            Join ClassEcho
          </h1>
          <p className="text-sm mb-3 md:text-base lg:mb-6">
            What are you waiting for? Embark on the enlightening journey now!
            Connect, learn, teach, and redefine the education experience with
            us.
          </p>
          <Link
            href={"/login"}
            className={buttonVariants({ variant: "default" })}
          >
            Get Started
          </Link>
        </div>
      </section>
      <h3 className="text-sm text-center py-5">@2023 ClassEcho</h3>
    </main>
  );
}
