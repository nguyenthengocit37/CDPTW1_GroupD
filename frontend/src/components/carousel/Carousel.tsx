import React from 'react';
import Slider from 'react-slick';
import { Job } from '../../types/Job';
import JobCard from '../jobCard/JobCard';

type Props = {
  data: Job[] | undefined;
  isLoading: boolean;
};

const Carousel = ({ data, isLoading }: Props) => {
  const settings = {
    dots: true,
    slidesToShow: (data && data.length < 4) ? data.length : 4 ,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: (data && data.length < 3) ? data.length : 3 ,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: (data && data.length < 2) ? data.length : 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Slider {...settings}>
      {data && data.length > 0 && data.map((job) => <JobCard key={job.id} job={job} />)}
    </Slider>
  );
};

export default Carousel;
