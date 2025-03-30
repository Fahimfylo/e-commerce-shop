import Slider from "react-slick";

const Testimonials = () => {
  const TestimonialData = [
    {
      id: 1,
      name: "Alex Thompson",
      text: "This innovative product has truly streamlined our workflow. Its efficiency and reliability are unmatched, making it an essential tool for our team.",
      img: "https://picsum.photos/101/101",
    },
    {
      id: 2,
      name: "Sophia Martinez",
      text: "The customer service was exceptional. They were responsive and helpful, resolving my issue quickly. I highly recommend their support for any product-related queries.",
      img: "https://picsum.photos/102/102",
    },
    {
      id: 3,
      name: "Ethan Williams",
      text: "I've been using this software for months, and it consistently delivers excellent performance. The user interface is intuitive, and the features are robust.",
      img: "https://picsum.photos/104/104",
    },
    {
      id: 5,
      name: "Olivia Brown",
      text: "The quality of the materials is outstanding. This item is durable and well-crafted, exceeding my expectations. It's a worthwhile investment for anyone seeking longevity.",
      img: "https://picsum.photos/103/103",
    },
  ];

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container">
        {/* header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p
            data-aos="fade-up"
            className="text-lg text-indigo-600 font-semibold"
          >
            From Customers
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Customer Reviews
          </h1>
          <p data-aos="fade-up" className="text-lg pt-1 text-gray-500">
            Read real feedback from our satisfied customers.
          </p>
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="my-6">
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative">
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt={`Profile of ${data.name}`}
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500">{data.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-light">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
