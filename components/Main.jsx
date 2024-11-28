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

const Main = ({ value, setValue, canvasRef }) => {
  function startRecording() {
    const chunks = []; // here we will store our recorded media chunks (Blobs)
    const stream = canvasRef.current.captureStream(); // grab our canvas MediaStream
    const rec = new MediaRecorder(stream); // init the recorder
    // every time the recorder has new data, we will store it in our array
    rec.ondataavailable = (e) => chunks.push(e.data);
    // only when the recorder stops, we construct a complete Blob from all the chunks
    rec.onstop = (e) => exportVid(new Blob(chunks));

    rec.start();
    setTimeout(() => rec.stop(), 5000); // stop recording in 5s
  }

  function exportVid(blob) {
    const vid = document.createElement("video");
    vid.src = URL.createObjectURL(blob);
    vid.controls = true;
    document.body.appendChild(vid);
    const a = document.createElement("a");
    a.download = "myvid.gif";
    a.href = vid.src;
    a.textContent = "download the video";
    document.body.appendChild(a);
  }
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
          accept="image/png,image/jpeg,image/webp"
          placeholder={"Upload image"}
          value={value}
          onChange={setValue}
        />
      </Group>
      <Button onClick={startRecording}>Record</Button>
    </Flex>
  );
};

export default Main;
