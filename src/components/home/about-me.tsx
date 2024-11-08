import Image from 'next/image'

const ABOUT_ME = {
    name: 'Karthik kumar',
    profession: 'Full Stack Developer',
    image: '/images/avatars/avatar1.jpg',
    description:
        'I am an experienced developer with a passion for creating efficient, scalable solutions. With a strong background in web development, I specialize in designing intuitive user interfaces and delivering seamless user experiences. In addition to my professional work, I dedicate my free time to learning emerging technologies and contributing to open-source projects.',
}

export const AboutMe = () => {
    return (
        <section className="p-6 bg-gray-100 flex flex-col items-center text-center">
            <Image
                src={ABOUT_ME.image}
                alt={ABOUT_ME.name}
                width={120}
                height={120}
                className="rounded-full mb-4 shadow-md"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {ABOUT_ME.name}
            </h2>
            <p className="text-lg text-gray-600 font-medium mb-3">
                {ABOUT_ME.profession}
            </p>
            <p className="text-gray-700 max-w-md">{ABOUT_ME.description}</p>
        </section>
    )
}
