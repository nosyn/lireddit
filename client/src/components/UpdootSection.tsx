import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  // post: PostsQuery["posts"]["posts"][0];
  post: PostSnippetFragment;
}

const UpdootSection = ({ post }: UpdootSectionProps) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");

  const [, vote] = useVoteMutation();

  const handleVote =
    (type: "updoot" | "downdoot", postId: number) => async () => {
      setLoadingState(
        type === "updoot" ? "updoot-loading" : "downdoot-loading"
      );

      await vote({
        postId,
        value: type === "updoot" ? 1 : -1,
      });

      setLoadingState("not-loading");
    };

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
      gap={1}
    >
      <IconButton
        variant="ghost"
        aria-label="Up Vote"
        icon={
          <ChevronUpIcon
            fontSize="24px"
            onClick={handleVote("updoot", post.id)}
          />
        }
        isLoading={loadingState === "updoot-loading"}
      />
      <Text>{post.points}</Text>
      <IconButton
        variant="ghost"
        aria-label="Down Vote"
        isLoading={loadingState === "downdoot-loading"}
        icon={
          <ChevronDownIcon
            onClick={handleVote("downdoot", post.id)}
            fontSize="24px"
          />
        }
      />
    </Flex>
  );
};

export default UpdootSection;