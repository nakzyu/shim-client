import React, { Fragment } from "react";
import UserProfile from "../components/UserProfile";
import PostList from "../../posts/components/PostList";
import { useParams } from "react-router";

const User = () => {
  const USERS = [
    {
      id: "u1",
      name: "Cha",
      image:
        "https://images.pexels.com/photos/1637114/pexels-photo-1637114.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      places: 3
    }
  ];
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
      creator: "u2"
    },
    {
      postId: "p4",
      date: "2020-03-03",
      description: "Cigar4",
      imageUrl:
        "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u2"
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
      creator: "u5"
    },
    {
      postId: "p4",
      date: "2020-03-03",
      description: "Cigar4",
      imageUrl:
        "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u6"
    },
    {
      postId: "p4",
      date: "2020-03-03",
      description: "Cigar4",
      imageUrl:
        "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      creator: "u7"
    }
  ];

  const userId = useParams().userId;
  const filterbyUserID = DUMMY_POST.filter(post => post.creator === userId);

  return (
    <div className="user_and_postlist">
      {console.log(filterbyUserID)}
      <UserProfile item={USERS} />
      <PostList item={filterbyUserID} />
    </div>
  );
};

export default User;
