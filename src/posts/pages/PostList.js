import React from "react";
import PostHolder from "../components/PostHolder";
import "./PostList.css";

const PostsList = () => {
  const DUMMY_POST = [
    {
      postId: "p1",
      date: "2020-03-03",
      description: "Cigar1",
      imageUrl:
        "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u1"
    },
    {
      postId: "p2",
      date: "2020-03-03",
      description: "Cigar2",
      imageUrl:
        "https://images.pexels.com/photos/3375997/pexels-photo-3375997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u1"
    },
    {
      postId: "p3",
      date: "2020-03-03",
      description: "Cigar3",
      imageUrl:
        "https://images.pexels.com/photos/1013328/pexels-photo-1013328.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u1"
    },
    {
      postId: "p4",
      date: "2020-03-03",
      description: "Cigar4",
      imageUrl:
        "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u1"
    },
    {
      postId: "p4",
      date: "2020-03-03",
      description: "Cigar4",
      imageUrl:
        "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u1"
    },
    {
      postId: "p4",
      date: "2020-03-03",
      description: "Cigar4",
      imageUrl:
        "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u1"
    },
    {
      postId: "p4",
      date: "2020-03-03",
      description: "Cigar4",
      imageUrl:
        "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u1"
    },
    {
      postId: "p4",
      date: "2020-03-03",
      description: "Cigar4",
      imageUrl:
        "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u1"
    },
    {
      postId: "p4",
      date: "2020-03-03",
      description: "Cigar4",
      imageUrl:
        "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u1"
    },
    {
      postId: "p4",
      date: "2020-03-03",
      description: "Cigar4",
      imageUrl:
        "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u1"
    }
  ];

  return (
    <ul className="post-lists">
      {DUMMY_POST.map(item => (
        <PostHolder {...item} />
      ))}
    </ul>
  );
};

export default PostsList;
