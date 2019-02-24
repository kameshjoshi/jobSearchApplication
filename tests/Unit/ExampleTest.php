<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;

class ExampleTest extends TestCase
{
    public function testIndexReturnCorrectResponse()
    {
        $response = $this->get('/jobs');
        $response->assertStatus(201);
    }

    public function testIndexReturnJson()
    {
        $response = $this->json('GET', '/jobs');
        $response
            ->assertStatus(201);
    }

    public function testSearchMethodwithTitle()
    {
        $response = $this->get('/jobs/title?query=dfx');
        $content = $response->decodeResponseJson();
        self::assertTrue(true,$this->check_json_resoponse_contains_search_query($content,'title','dfx'));
        $response->assertStatus(201);
    }

    public function testSearchMethodwithCompanyname()
    {
        $response = $this->get('/jobs/companyname?query=Onco');
        $content = $response->decodeResponseJson();
        self::assertTrue(true,$this->check_json_resoponse_contains_search_query($content,'companyname','Onco'));
        $response->assertStatus(201);
    }

    public function testSearchMethodwithLocation()
    {
        $response = $this->get('/jobs/location?query=Bengaluru');
        $content = $response->decodeResponseJson();
        self::assertTrue(true,$this->check_json_resoponse_contains_search_query($content,'location','Bengaluru'));
        $response->assertStatus(201);
    }

    public function testSearchMethodwithSkills()
    {
        $response = $this->get('/jobs/skills?query=css');
        $content = $response->decodeResponseJson();
        self::assertTrue(true,$this->check_json_resoponse_contains_search_query($content,'skills','css'));
        $response->assertStatus(201);
    }

    public function testSearchMethodwithSource()
    {
        $response = $this->get('/jobs/source?query=techgig');
        $content = $response->decodeResponseJson();
        self::assertTrue(true,$this->check_json_resoponse_contains_search_query($content,'source','techgig'));
        $response->assertStatus(201);
    }

    public function testSearchMethodwithSalary()
    {
        $response = $this->get('/jobs/salary?query=10000');
        $content = $response->decodeResponseJson();
        self::assertTrue(true,$this->check_json_resoponse_contains_search_query($content,'salary','10000'));
        $response->assertStatus(201);
    }

    public function testSearchMethodwithType()
    {
        $response = $this->get('/jobs/type?query=intern');
        $content = $response->decodeResponseJson();
        self::assertTrue(true,$this->check_json_resoponse_contains_search_query($content,'type','intern'));
        $response->assertStatus(201);
    }

    public function testSearchMethodwithExperience()
    {
        $response = $this->get('/jobs/experience?query=8');
        $content = $response->decodeResponseJson();
        self::assertTrue(true,$this->check_json_resoponse_contains_search_query($content,'experience','8'));
        $response->assertStatus(201);
    }

    public function testSearchMethodResponseWithIncorrectInput()
    {
        $response = $this->get('/jobs/title?query=');
        $response
        ->assertStatus(201)
        ->assertJson([]);
    }

    public function testSearchMethodSortedWithLocation()
    {
        $response = $this->get('/jobs/title?query=dfx&sort_by=location');
        $response->assertStatus(201);
    }

    public function testSearchMethodSortedWithType()
    {
        $response = $this->get('/jobs/title?query=dfx&sort_by=type');
        $response->assertStatus(201);
    }

    public function testSearchMethodSortedWithLocationCheckValuesAreSorted()
    {
        $response = $this->get('/jobs/type?query=intern&sort_by=location');
        $content = $response->decodeResponseJson();
        self::assertTrue(true,$this->check_json_resoponse_check_values_are_sorted($content,'location'));
        $response->assertStatus(201);
    }

    public function testSearchMethodSortedWithTypeCheckValuesAreSorted()
    {
        $response = $this->get('/jobs/type?query=intern&sort_by=type');
        $content = $response->decodeResponseJson();
        self::assertTrue(true,$this->check_json_resoponse_check_values_are_sorted($content,'type'));
        $response->assertStatus(201);
    }

    private function check_json_resoponse_contains_search_query($content,$seachValue,$query)
    {	
    	foreach ($content as $key => $jsons) { 
    		if(strpos(strtolower($jsons[$seachValue]),strtolower($query)) === false){
    			return false;
    		}
		}
        return true;
    }

    private function check_json_resoponse_check_values_are_sorted($content,$seachValue)
    {	
    	$arrayToCheck = array();

    	foreach ($content as $key => $jsons) { 
    		array_push($arrayToCheck, $jsons[$seachValue]);
		}

		$sorted = array_values($arrayToCheck);
		sort($sorted);
		if ( $arrayToCheck !== $sorted ) {
		  return false;
		}

        return true;
    }
}