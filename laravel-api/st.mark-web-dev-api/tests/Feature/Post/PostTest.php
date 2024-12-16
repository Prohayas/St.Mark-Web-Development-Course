<?php

use App\Models\Post;
use Illuminate\Testing\Fluent\AssertableJson;
use Symfony\Component\HttpFoundation\Response;

test('can get all posts', function () {

    $postRecordFactory = 10;
    Post::factory($postRecordFactory)->create();

    $this->getJson('/api/posts')
          ->assertStatus(Response::HTTP_OK)
                ->assertJsonStructure([
                    [
                        'id',
                        'content',
                        'title',
                        'created_at',
                        'updated_at'
                    ]
                ]);

    $this->assertDatabaseCount('posts', $postRecordFactory);
});


test('can show a post', function () {

    $post = Post::factory()->create();

    $this->getJson('/api/posts/'.$post->id)
            ->assertStatus(Response::HTTP_OK)
            ->assertJson(fn (AssertableJson $json) =>
                $json->where('id',$post->id)
                     ->where('title', $post->title)
                     ->where('content', $post->content)
                     ->etc());


    $this->assertModelExists($post);
});


test('can create/store post', function () {

    $payload = Post::factory()->make()->toArray();

    $this->postJson('/api/posts', $payload)
         ->assertCreated()
         ->assertJson(fn (AssertableJson $json) =>
         $json->where('title', $payload['title'])
              ->where('content', $payload['content'])
              ->etc());

    $this->assertDatabaseHas('posts', $payload);
});

test('can update a post', function () {

    $post = Post::factory()->create();

    $payload = ['title' => 'Updated Title'];

    $this->putJson('/api/posts/'.$post->id, $payload)
         ->assertStatus(Response::HTTP_OK)
         ->assertJson(fn (AssertableJson $json) =>

            $json->where('title', $payload['title'])
                  ->etc()
        );


    $this->assertDatabaseHas('posts', $payload);

});


test('can delete a post', function () {

    $post = Post::factory()->create();

    $this->delete('/api/posts/'.$post->id)
          ->assertStatus(Response::HTTP_OK)
          ->assertJson(fn (AssertableJson $json) =>

            $json->has('message')
                 ->missing('post')
);

    $this->assertModelMissing($post);
});
