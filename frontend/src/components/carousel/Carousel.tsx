import React from 'react';
import Slider from 'react-slick';
import { Job } from '../../types/Job';
import JobCard from '../jobCard/JobCard';

type Props = {
  data: Job[] | undefined;
  isLoading: boolean;
};
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const Carousel = ({ data, isLoading }: Props) => {
  return (
    <Slider {...settings}>
      {data && data.length > 0 && data.map((job) => <JobCard key={job.id} job={job} />)}
    </Slider>
  );
};

export default Carousel;
