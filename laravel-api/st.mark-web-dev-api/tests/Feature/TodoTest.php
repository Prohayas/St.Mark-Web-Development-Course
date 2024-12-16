<?php

use App\Models\Todo;
use Illuminate\Testing\Fluent\AssertableJson;
use Symfony\Component\HttpFoundation\Response;


test('can get all todos', function () {

    $todos = Todo::factory(50)->create();

    $this->getJson('/api/todos')
         ->assertStatus(Response::HTTP_OK)
         ->assertJsonStructure([
            [
                'id',
                'todo',
                'completed',
                'created_at',
                'updated_at'
            ]
            ]);

    $this->assertDatabaseCount('todos', 50);
});

test('can store todo', function () {

    $payload = Todo::factory()->make()->toArray();

    $this->postJson('/api/todos', $payload)
         ->assertCreated()
         ->assertJson( fn (AssertableJson $json) =>

            $json->where('todo', $payload['todo'])
                 ->etc()
        );


    $this->assertDatabaseHas('todos', ['todo' => $payload['todo']]);
});


test('can show todo', function () {


    $todo = Todo::factory()->create();


    $this->getJson('/api/todos/'.$todo->id)
         ->assertStatus(Response::HTTP_OK)
         ->assertJson( fn (AssertableJson $json) =>

            $json->where('todo', $todo->todo)
                 ->etc()
        );

    $this->assertModelExists($todo);
});


test('can updated todo', function () {


    $todo = Todo::factory()->create();

    $payload = ['todo' => 'Updated Todo'];


    $this->putJson('/api/todos/'.$todo->id, $payload)
         ->assertStatus(Response::HTTP_OK)
         ->assertJson(fn (AssertableJson $json) =>

            $json->where('todo', $payload['todo'])
                 ->etc()
        );

    $this->assertDatabaseHas('todos', $payload);
});

test('can delete todo', function () {


    $todo = Todo::factory()->create();

    $this->delete('/api/todos/'.$todo->id)
         ->assertStatus(Response::HTTP_OK)
         ->assertJson(fn (AssertableJson $json) =>

            $json->has('message')
                 ->missing('data')
        );

    $this->assertModelMissing($todo);
});
