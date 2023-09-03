import { createApp, ref } from "vue";
createApp({
  template: `
      <ul class="divide-y divide-gray-200">
        <li v-for="person in people" :key="person.email" class="py-4 flex">
          <img class="h-10 w-10 rounded-full" :src="person.image" alt="" />
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">{{ person.name }}</p>
            <p class="text-sm text-gray-500">{{ person.email }}</p>
          </div>
        </li>
      </ul>
`,
  setup() {
    const message = ref("Hello Vue!");
    const people = [
      {
        name: "Calvin Hawkins",
        email: "calvin.hawkins@example.com",
        image:
          "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Kristen Ramos",
        email: "kristen.ramos@example.com",
        image:
          "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Ted Fox",
        email: "ted.fox@example.com",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ];

    return {
      message,
      people,
    };
  },
}).mount("#app");

import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-face-three.prod";
const mindarThree = new MindARThree({
  container: document.querySelector("#container"),
});
const { renderer, scene, camera } = mindarThree;

const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

const faceMesh = mindarThree.addFaceMesh();
const texture = new THREE.TextureLoader().load(
  "./canonical_face_model_uv_visualization.png",
);
faceMesh.material.map = texture;
faceMesh.material.transparent = true;
faceMesh.material.needsUpdate = true;
scene.add(faceMesh);

const start = async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};
start();
