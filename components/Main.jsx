import Link from "next/link";
import {
  Button,
  Center,
  Container,
  FileInput,
  Flex,
  Group,
  Space,
  Text,
} from "@mantine/core";

export default function Main({ value, setValue }) {
  return (
    <Flex align={"center"} direction={"column"}>
      <Space h="xl" />
      <Text>Other Effects</Text>
      <Group mt={20}>
        <Link href="/">
          <Button>Rain</Button>
        </Link>
        <Link href="/smoke">
          <Button>Smoke</Button>
        </Link>
        <Link href="/fire">
          <Button>Fire</Button>
        </Link>
      </Group>

      <Group mt={50}>
        <FileInput
          accept="image/png,image/jpeg"
          placeholder={"Upload image"}
          value={value}
          onChange={setValue}
        />
      </Group>
    </Flex>
  );
}
