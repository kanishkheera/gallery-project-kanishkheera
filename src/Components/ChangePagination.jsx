"use client";

import { ButtonGroup, Center, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const ChangePagination = ({ page, setPage, totalPages }) => {
  return (
    <Center mt={8}>
      <Pagination.Root count={totalPages} pageSize={1} page={page} onPageChange={(details)=>setPage(details.page)}>
        <ButtonGroup variant="ghost" size={{ base: "sm", md: "2xl" }}>
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Center>
  );
};

export default ChangePagination;
