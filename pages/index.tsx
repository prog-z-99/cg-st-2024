import { Button, FileInput, Group } from "@mantine/core";
import Script from "next/script";
import { useState } from "react";

export default function IndexPage() {
  const [value, setValue] = useState<File | null>(null);
  console.log(value);
  return (
    <Group mt={50} justify="center">
      <Button size="xl">Welcome to Mantine!</Button>
      <FileInput label="input Label" value={value} onChange={setValue} />
      <Script src="smokeEffect.js" />
      <canvas id="canvas1" />
    </Group>
  );
}
